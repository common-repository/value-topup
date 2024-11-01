<?php
/*
Plugin Name:  Value Topup 
Description:  Start offering Mobile TopUp & Airtime Recharge Services on your website by installing this plugin in a few simple steps and become our business partner
Version:      1.0
Author:       ppnsupport
Author URI:   https://www.prepaynation.com
License:      GPL2 or later
License URI:  http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
Text Domain: value-topup 
*/
if ( ! defined( 'ABSPATH' ) ) {die( 'Invalid request.' );}



if ( ! class_exists( 'ValueTopupPlugin' ) ) {
	include_once( __DIR__.'/install.php');   

	class ValueTopupPlugin {

		protected $protected_plugin_api;
		protected $ajax_plugin_nonce;

		public function __construct() {
			$this->_constants();
			$this->_hooks();
		}

		protected function _constants() {
			define( 'PPN_VALUETOPUP_API_VERSION', 1.0 );
			define( 'PPN_VALUETOPUP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) ); 
			define( 'PPN_VALUETOPUP_PLUGIN_FILE', __FILE__ );
		}

		protected function _hooks() {
			add_action('admin_menu', 'topup_plugin_setup_menu'); 
		}
	} 

		
	################ admin section ################
	register_activation_hook(__FILE__, 'topup_install'); //db install
	register_activation_hook( __FILE__, 'topup_plug_create_page' );
	register_uninstall_hook( __FILE__, 'topup_uninstall' );
	register_deactivation_hook( __FILE__, 'topup_uninstall' );
	################ db section ################

	################ frount-end section ################
	if (!session_id()) {   
		$config = topupPlugGetConfig();   
	   	if (!session_id()) { session_start();  }
	   	$_SESSION['topup_api_user'] = $config[0]['username'] ?? '';
	   	$_SESSION['topup_api_password'] = $config[0]['password'] ?? '';
	   	$_SESSION['topup_success_url'] = home_url().'/topup-response';
	    $_SESSION['topup_failed_url'] = home_url().'/topup-response';
	    $_SESSION['topup_processing_url'] = home_url().'/topup-response';
	    $_SESSION['topup_ABSPATH'] = ABSPATH;
	    $_SESSION['topup_home_page_url'] = get_home_url();
	} 
	 
	if (!is_admin()) {
		add_shortcode('TOPUP_PAYMENT_RESPONSE', 'topup_payment_response');
	}
	 
	if(!empty($_SESSION['topup_api_user']) && !empty($_SESSION['topup_api_password'])){
		wp_register_script('stripe.js', 'https://js.stripe.com/v3/' );
		wp_enqueue_script('stripe.js'); 

		add_action('wp_footer', 'valuetopup_insert_my_footer');
		add_action('wp_enqueue_scripts', 'valuetopup_add_theme_scripts' ); 
		add_action('wp_ajax_get_process', 'valuetopup_get_process'); 		 
		add_action('wp_ajax_nopriv_get_process', 'valuetopup_get_process');  

		add_action('wp_ajax_valuetopup_pay_stripe', 'valuetopup_pay_stripe'); 
		add_action('wp_ajax_nopriv_valuetopup_pay_stripe', 'valuetopup_pay_stripe');  
		################ frount-end section ################

		######################## ajax ########################
		add_action('wp_ajax_call_catelog_api', 'valuetopup_call_catelog_api');
		add_action('wp_ajax_nopriv_call_catelog_api', 'valuetopup_call_catelog_api');

		add_action('wp_ajax_call_topup_api', 'valuetopup_call_topup_api');
		add_action('wp_ajax_nopriv_call_topup_api', 'valuetopup_call_topup_api');

		add_action('wp_ajax_call_mobile_op_api', 'valuetopup_call_mobile_op_api');
		add_action('wp_ajax_nopriv_call_mobile_op_api', 'valuetopup_call_mobile_op_api');

		add_action('wp_ajax_call_set_data', 'valuetopup_call_set_data');
		add_action('wp_ajax_nopriv_call_set_data', 'valuetopup_call_set_data');

		add_action('wp_ajax_call_pin_tran', 'valuetopup_call_pin_tran');
		add_action('wp_ajax_nopriv_call_pin_tran', 'valuetopup_call_pin_tran');
		######################## ajax ########################
	} 


	$valueTopupPlugin = new ValueTopupPlugin();

}
 

	

 