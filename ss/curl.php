<?php 
 if ( ! class_exists( 'TopupVal' ) ) {
 
    Class TopupVal { 
         
        public static function getCatalog(){  
            return self::cURL("/api/v1/wordpress/catalog",[],'GET');
        }
      
        public static function getMobileLookup($mobile){ 
            return self::cURL("/api/v1/catalog/lookup/mobile/{$mobile}",[],'GET');         
        }

        public static function getPinTran($req){ 
            return self::cURL('/api/v1/wordpress/pin',$req);         
        }

        public static function getTopupTran($req){ 
            return self::cURL('/api/v1/wordpress/topup',$req); 
        }

        public static function cURL($urlEndpoint,$param,$method='POST') {
            // $url = 'http://qa.valuetopup.com';  //testing 
            $url = 'https://www.valuetopup.com';     //production   
            $user = sanitize_text_field($_SESSION['topup_api_user']);
            $password = sanitize_text_field($_SESSION['topup_api_password']);
          
            if(trim($user)=='' || trim($password)==''){
                echo json_encode(["msg" => "No config found"]);exit;
            }

            $response ='';
            $final_url = $url.$urlEndpoint;
         
            $headers = array(
                'Content-Type'=>'application/json',
                'Authorization'=>'Basic '. base64_encode($user.':'.$password) 
            );
          
            $sslverify = apply_filters( 'https_local_ssl_verify', false );
            //--------------http api ---------------
            $args = array(
                'body'        => !empty($param) ? json_encode($param) : '',
                'method'      =>  $method,
                'timeout'     => '6000',
                // 'redirection' => '10',
                'sslverify'   => $sslverify, 
                // 'blocking'    => true, 
                'headers'     => $headers, 
            );
            $response = wp_remote_post( $final_url, $args );
     
            //-------------- http api end -------------
            $return = ['flag'=> 0 , 'msg'=> 'Something went wrong']; 
            if ( is_wp_error( $response ) ) {
                $return = ['flag'=> 0 , 'msg'=> 'cURL error: ' . $response->get_error_message()];             
            }else{
                $response_body = wp_remote_retrieve_body($response);
                $return = ['flag'=> 1 , 'msg'=> 'Success', 'resp_data'=> json_decode($response_body,true)]; 
            }
            // curl_close($curl);     
            $result_json = json_encode($return); 
            
            return $return;
        }
     
    }
}
?>