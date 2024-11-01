<?php require_once  __DIR__.'/ss/curl.php'; 

global $topup_db_version;
$topup_db_version = "1.2.0";

if ( ! function_exists( 'topup_install' ) ) {
    function topup_install() {
        global $wpdb;
        global $topup_db_version;
        global $tableprefix;

        $installed_version = get_option('topup_db_version'); 

        $tableprefix = $wpdb->prefix . 'topup_';

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
     
        if ( $installed_version !== $topup_db_version ) {
        
            /* Create table for packages */
            $config = $tableprefix . 'config';
            $sql = "CREATE TABLE ". $config ."(
                id mediumint(9) NOT NULL AUTO_INCREMENT, 
                username VARCHAR(100) NOT NULL, 
                password VARCHAR(100) NOT NULL,            
                PRIMARY KEY  (id)
            );";
           dbDelta($sql);

            /* Create table for hotels */
            $transactions = $tableprefix . 'transactions';
            $sql = "CREATE TABLE ".$transactions ." (            
                id INT(11) NOT NULL AUTO_INCREMENT,
                url VARCHAR(200) NOT NULL,
                req TEXT NOT NULL,
                resp LONGTEXT NOT NULL,
                header_code INT(11) DEFAULT NULL,
                added_on TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                field1 VARCHAR(200) DEFAULT NULL,
                field2 VARCHAR(200) DEFAULT NULL,
                field3 VARCHAR(200) DEFAULT NULL,
                PRIMARY KEY  (id)
            );";
     
            dbDelta($sql); 

            update_option('topup_db_version', $topup_db_version);
        } 
    }
}

if ( ! function_exists( 'topup_plug_create_page' ) ) {
    function topup_plug_create_page(){
     
        $page_nm = 'Topup Response';

        if(get_page_by_title($page_nm) === NULL){
            $my_post = array(
              'post_title'    => wp_strip_all_tags( $page_nm ),
              'post_content'  => '[TOPUP_PAYMENT_RESPONSE]',
              'post_status'   => 'publish',
              'post_author'   => 1,
              'post_type'     => 'page',
              'post_category' => array( )
            ); 
            wp_insert_post( $my_post ); 
        } 
             
    }
}

if ( ! function_exists( 'topup_payment_response' ) ) {
    function topup_payment_response( $atts, $content = null ) {
        global $wpdb;

        $tableprefix = $wpdb->prefix . 'topup_';

        $transaction = $tableprefix . 'transactions';  
     
        $transact =   esc_sql($_SESSION['transact']) ;  
        if(!empty($transact)){ 
            $transact['tr_resp']['resp_data'] = json_decode(json_encode($transact['tr_resp']['resp_data']),true); 
            
            $wpdb->query("INSERT INTO $transaction (id, url, req, resp) VALUES(NULL,'".json_encode($transact['tr_url'])."', '".json_encode($transact['tr_req'])."', '".json_encode($transact['tr_resp'])."')");  

            unset($_SESSION['transact']);
             
        }
        ob_start();
        include_once( __DIR__.'/views/topup_response.php'); 
        return ob_get_clean();
    }
}

if ( ! function_exists( 'topup_uninstall' ) ) {
    function topup_uninstall(){
        global $wpdb; 
        update_option('topup_db_version', '');
    }
}

if ( ! function_exists( 'topupPlugGetConfig' ) ) {
    function topupPlugGetConfig(){
    	global $wpdb; 

    	$tableprefix = $wpdb->prefix . 'topup_';

    	$config = $tableprefix . 'config'; 

    	$querystr = "SELECT * FROM $config WHERE $config.ID = 1 ";

    	$pageposts = $wpdb->get_results($querystr, ARRAY_A);
     
    	return $pageposts;
    } 
}
if ( ! function_exists( 'topupPlugGetTransactions' ) ) {
    function topupPlugGetTransactions(){
    	global $wpdb; 

    	$tableprefix = $wpdb->prefix . 'topup_';

    	$transactions = $tableprefix . 'transactions'; 

    	$querystr = "SELECT * FROM $transactions order by id desc limit 50";

    	$pageposts = $wpdb->get_results($querystr, ARRAY_A);
     
    	return $pageposts;
    }
}

if ( ! function_exists( 'topupPlugSetConfig' ) ) {
    function topupPlugSetConfig($username,$password){
    	global $wpdb; 

    	$tableprefix = $wpdb->prefix . 'topup_';

    	$config = $tableprefix . 'config'; 

    	$querystr = "SELECT * FROM $config WHERE $config.ID = 1 ";

    	$pageposts = $wpdb->get_results($querystr, ARRAY_A);
     	
     	if(empty($pageposts)){
    		$querystr = "INSERT INTO $config (id,username,password) VALUES (1,'$username','$password')";
     	}else{
     		$querystr = "UPDATE $config SET username = '$username' ,password= '$password' WHERE $config.ID = 1";
     	}	
     
    	$pageposts = $wpdb->get_results($querystr, ARRAY_A); 
    	 
    	$config = json_decode($jsondata,true);
     
    	return $config;
    } 
}
if ( ! function_exists( 'topup_plugin_setup_menu' ) ) {
    function topup_plugin_setup_menu(){
        add_menu_page( 'Value TopUp Page', 'Value TopUp', 'manage_options', 'topup-plugin', 'admin_form_init' );
    }
}
if ( ! function_exists( 'admin_form_init' ) ) {
    function admin_form_init(){    
        include_once( __DIR__.'/views/admin/topup_adm_form.php'); 
    } 
}
if ( ! function_exists( 'valuetopup_insert_my_footer' ) ) {
    function valuetopup_insert_my_footer() {     
        include_once( __DIR__.'/views/plugin_view.php'); 
    }
}
if ( ! function_exists( 'valuetopup_add_theme_scripts' ) ) {
    function valuetopup_add_theme_scripts($hook) {   
        wp_enqueue_style( 'topup-style-bootstrap', plugin_dir_url( __FILE__ ).'ss/html/css/bootstrap/bootstrap.min.css' );
        wp_enqueue_style( 'topup-style-all', plugin_dir_url( __FILE__ ). 'ss/html/css/fontawesome/all.min.css');  
        wp_enqueue_style( 'topup-style-select', plugin_dir_url( __FILE__ ). 'ss/html/css/select2/select2.min.css');  
        wp_enqueue_style( 'topup-style-style', plugin_dir_url( __FILE__ ). 'ss/html/css/style.css');  
        wp_enqueue_style( 'topup-style-custome', plugin_dir_url( __FILE__ ). 'ss/assets/css/custome.css');   
        wp_enqueue_script( 'jquery' );
        // wp_enqueue_script( 'topup-script', get_template_directory_uri() . '/js/script.js', array ( 'jquery' ), 3.6, true); 
        wp_enqueue_script( 'topup-script-appear', plugin_dir_url( __FILE__ ) . 'ss/html/js/jquery.appear.js');
        wp_enqueue_script( 'topup-script-popper', plugin_dir_url( __FILE__ ) . 'ss/html/js/popper/popper.min.js');
        wp_enqueue_script( 'topup-script-bootstrap', plugin_dir_url( __FILE__ ) . 'ss/html/js/bootstrap/bootstrap.min.js');
        wp_enqueue_script( 'topup-script-select2', plugin_dir_url( __FILE__ ) . 'ss/html/js/select2/select2.full.js');
        wp_enqueue_script( 'topup-script-custome', plugin_dir_url( __FILE__ ) . 'ss/html/js/custom.js');
        wp_enqueue_script( 'topup-script-top', plugins_url( 'ss/assets/js/app.js?t='.time() , __FILE__), array() ); 
        wp_localize_script( 'topup-script-top', 'Topup_Ajax_bject', array( 'ajax_url' => admin_url( 'admin-ajax.php' ))); 

    }
}
if ( ! function_exists( 'valuetopup_call_catelog_api' ) ) {
    function valuetopup_call_catelog_api(){
       $result = TopupVal::getCatalog();
       echo json_encode($result);
       wp_die();
    }
}
if ( ! function_exists( 'valuetopup_call_topup_api' ) ) {
    function valuetopup_call_topup_api(){   
       $result = TopupVal::getTopupTran();
       echo json_encode($result);
       wp_die();
    }
}

if ( ! function_exists( 'valuetopup_call_mobile_op_api' ) ) {
    function valuetopup_call_mobile_op_api(){   
       $mobile = sanitize_text_field($_POST['mobile']);
       $result = TopupVal::getMobileLookup($mobile);
       echo json_encode($result);
       wp_die();
    }
}
if ( ! function_exists( 'valuetopup_call_pin_tran' ) ) {
    function valuetopup_call_pin_tran(){
       $result = TopupVal::getPinTran(); 
       echo json_encode($result);
       wp_die();
    }
}

if ( ! function_exists( 'valuetopup_dcrpt' ) ) {
    function valuetopup_dcrpt($enc,$type){
        $rawData = base64_decode($enc);
        $decrypted = openssl_decrypt($rawData, 'AES-128-ECB', 'VmYp3s6v9y$B&E)H',  OPENSSL_RAW_DATA | OPENSSL_DONT_ZERO_PAD_KEY | OPENSSL_ZERO_PADDING);
        $data = rtrim($decrypted, "\0");
        $arr = json_decode($data,true);
        return $arr['Keys'][$type] ?? '';
    }
}
    
if ( ! function_exists( 'valuetopup_call_set_data' ) ) {
    function valuetopup_call_set_data(){ 
       $_SESSION["country_code"] = sanitize_text_field($_POST['country_code']);
       $_SESSION["cost"] = sanitize_text_field($_POST['total_amount_paid_int']);
       $_SESSION["mobile_number"] = sanitize_text_field($_POST['mobile_number']);    
       $_SESSION["skuId"] = sanitize_text_field($_POST['skuId']); 
       $_SESSION["fees"] = sanitize_text_field($_POST['fees']); 
       $_SESSION["convenienceFee"] = sanitize_text_field($_POST['convenienceFee']); 
       $_SESSION["total_amount_paid_total"] = sanitize_text_field($_POST['total_amount_paid_total']);     
       $_SESSION["imgUrl"] = sanitize_text_field($_POST['imgUrl']);     
       $_SESSION["total_amount_paid_int_usd"] = sanitize_text_field($_POST['total_amount_paid_int_usd']);  
       $_SESSION["country_code_int"] = sanitize_text_field($_POST['country_code_int']); 
       $_SESSION["operators_label"] = sanitize_text_field($_POST['operators_label']); 
       $_SESSION["user_currency"] = sanitize_text_field($_POST['user_currency']); 
       $all_keys = sanitize_text_field($_POST['allkey']); 
       $_SESSION["se_key"] = valuetopup_dcrpt($all_keys,'SKey');
       $result =  esc_sql($_POST); 
       $result['pe_key'] = valuetopup_dcrpt($all_keys,'PKey');
       echo json_encode($result);wp_die();
    }
}

if ( ! function_exists( 'valuetopup_get_process' ) ) {
    function valuetopup_get_process(){
          if (!session_id()) {  session_start();   }
      
          if(isset($_POST['redirect_status']) && sanitize_text_field($_POST['redirect_status'])=='succeeded'){           
              $app = new TopupVal();
              $transaction_status = '';
              $id = sanitize_text_field($_POST['payment_intent']); 
              $cost = sanitize_text_field($_SESSION['cost']);
              $fees = sanitize_text_field($_SESSION['fees']);
              $convenienceFee = sanitize_text_field($_SESSION['convenienceFee']);
              $array = [
                    "PaymnetId"=> trim($id),
                    "Mobile"=> sanitize_text_field($_SESSION['country_code_int']).sanitize_text_field($_SESSION['mobile_number']),
                    "Amount"=> number_format($cost,2),           
                    "Fee"=> number_format(number_format($fees,2)+ number_format($convenienceFee,2) ,2),
                    "CorrelationId"=> rand(1000000,9999999),  
                    "SKUId"=>sanitize_text_field($_SESSION["skuId"]),  
                    "TransactionCurrencyCode"=> sanitize_text_field($_SESSION['user_currency'])
                  ];

              $return = $app::getTopupTran($array);         
              if(!empty($array)){
                  $transactions  = [
                                      'tr_url' => '/api/v1/wordpress/topup',
                                      'tr_req' => $array , 
                                      'tr_resp' => $return 
                                  ];
                  $_SESSION['transact'] = $transactions;
              }

              if(isset($return['resp_data']['responseCode']) && ($return['resp_data']['responseCode']==='000')){ 
                  $transaction_status = 'Success';
              }else{
                  $transaction_status = 'Failed';
              }  
              $_SESSION['transaction_status'] = $transaction_status;
              $_SESSION['return'] = $return;
              $_SESSION['array'] = $array; 
           
          }else if(isset($_POST['msg']) && sanitize_text_field($_POST['msg'])!=''){
               $array = [          
                    "Mobile" => sanitize_text_field($_SESSION['country_code_int']).sanitize_text_field($_SESSION['mobile_number']),
                    "Amount" => number_format(sanitize_text_field($_SESSION['cost']),2),
                    "Fee" => sanitize_text_field($_SESSION["fees"]) + sanitize_text_field($_SESSION["convenienceFee"]),
                    "CorrelationId" => rand(1000000,9999999),  
                    "SKUId" => sanitize_text_field($_SESSION["skuId"]),  
                    "TransactionCurrencyCode" => sanitize_text_field($_SESSION['user_currency'])
                  ]; 

              $_SESSION['transaction_status'] = 'Failedwithmsg';
              $_SESSION['msg'] = sanitize_text_field($_POST['msg']);
              $_SESSION['array'] = $array; 
           
          } 

          if($_SESSION['transaction_status']=='Success'){
              $url = sanitize_text_field($_SESSION['topup_success_url']) ;
          }else{
              $url = sanitize_text_field($_SESSION['topup_failed_url']); 
          }
          echo json_encode(['url'=>$url]); wp_die();      
    }
}

if(!function_exists('valuetopup_pay_stripe')){
    function valuetopup_pay_stripe(){

        if (!session_id()) { session_start();  } 
 
        require_once __DIR__.'/ss/app/vendor/autoload.php';

        \Stripe\Stripe::setApiKey($_SESSION['se_key']);

        header('Content-Type: application/json');

        try { 
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr); 
         
            $req = [
                'capture_method' => 'manual', //automaticomatic
                'amount' => (float)$_SESSION["total_amount_paid_int_usd"] * 100,
                'currency' => $_SESSION["user_currency"], 
                //'payment_method_types' => ['card' ,'klarna'] 
            ];
            try{
                $paymentIntent = \Stripe\PaymentIntent::create($req); 
                $output = ['clientSecret' => $paymentIntent->client_secret];
            }catch(Exception $e) { 
                http_response_code(200);
                $output = [];
                $output = ['error' => $e->getMessage()];       
            }     
            echo json_encode($output);
        } catch (Error $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }
}


?>