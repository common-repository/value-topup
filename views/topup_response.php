  
  <?php if(isset($_GET['processing']) && $_GET['processing']=='true'){
    echo "<style>@keyframes blink {80% { color: transparent }}.loader__dot { animation: 1s blink infinite }.loader__dot:nth-child(2) { animation-delay: 250ms }.loader__dot:nth-child(3) { animation-delay: 500ms }</style>";
    echo "<center><div class='loader' id='valuetopup_processing'>Please wait while we are processing your transaction <span class='loader__dot'>.</span><span class='loader__dot'>.</span><span class='loader__dot'.</span></div></center><br/><center><img id='payl' height='25px'src='". plugin_dir_url( dirname( __FILE__ ) )."ss/assets/loadder.gif' ></center>";
    echo "<script>$(document).ready(function(){ $('#value_topup_content_box').hide();  });</script>";
  }else{?>
 
          <div class="accordion accordion-flush2" id="accordionFlushExample2"> 
            <?php  
       
            $transaction_status = sanitize_text_field($_SESSION['transaction_status']) ?? '';
            $return = $_SESSION['return'] ?? [];
            $array = $_SESSION['array'] ?? []; 

            if( $transaction_status=='Failedwithmsg' ){ 
                $return = esc_html_e($_SESSION['msg']) ?? [];?>
                    <center>
                        <div class="opretor-section payment-failed mb-3" style='margin-top:15px;height: auto;'>
                         <h4 class="mb-1">Transaction is Failed !!!</h4><br/>
                         <p class="mb-0">We are sorry, but the transaction was not completed for <b> <?php esc_html_e( $_SESSION["operators_label"]); ?> </b> mobile number <b><?php esc_html_e('+'.$array["Mobile"]);?></b> , in the amount of <b><?php echo  ($_SESSION['total_amount_paid_int_usd']).' '. esc_html_e($array['TransactionCurrencyCode']);?></b>.</p><br/>
                          
                           <br/>
                         <h4 class="mb-1">Reason</h4>
                         <p class="mb-0">The Topup was unsuccessful. <?php esc_html_e($return)  ??   esc_html_e("Transaction Failed"); ?> </p>
                        </div> 
                    </center>

            <?php }else if( $transaction_status=='Failed' ){ ?>
                    <center>
                        <div class="opretor-section payment-failed mb-3" style='margin-top:15px;height: auto;'>
                         <h4 class="mb-1">Transaction is Failed !!!</h4><br/>
                         <p class="mb-0">We are sorry, but the transaction was not completed for <b> 
                            <?php esc_html_e($_SESSION["operators_label"]); ?> </b> mobile number <b>
                            <?php esc_html_e('+'.$array["Mobile"]);?></b> , in the amount of <b>
                            <?php esc_html_e($_SESSION['total_amount_paid_int_usd']).' '.esc_html_e($array['TransactionCurrencyCode']);?></b>.</p><br/>
                            <p class="mb-0">We did not charged your card. You may see a hold on your card. This will be released in 2-3 Business Days</p>
                           <br/>
                         <h4 class="mb-1">Reason</h4>
                         <p class="mb-0">The Topup was unsuccessful. <?php ($return['resp_data']['errorMessage']) ? esc_html_e($return['resp_data']['errorMessage']) : esc_html_e(($return['resp_data']['responseMessage']) ?? "Transaction Failed"); ?> </p>
                        </div> 
                    </center>

            <?php }else if($transaction_status=='Success'){ ?> 

              <div class="opretor-section payment-failed mb-3" style='height: auto;max-height:none!important'>
                        <div class="print-amount">
                            <center><h4>Transaction is Successful !!! </h4></center>
                            <ul class="ps-0 mb-0">
                                <li>
                                    <p><?php  esc_html_e($return['resp_data']['payLoad']['product']['productName']) ?? ''   ?></p>
                                    <span><?php  esc_html_e($return['resp_data']['payLoad']['transactionDate']) ?? date('d-m-Y h:i:s'); ?></span>
                                </li>
                                <li>
                                    <div class="opretor-blog">
                                        <div class="opretor-blog-img"> <img class="img-fluid" src="<?php  esc_html_e($_SESSION['imgUrl']) ;?>" alt=""> </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="print-amount border-bottom-0 pb-0">
                            <ul class="ps-0 mt-3 mb-0">
                                <li>
                                    <b><h5><?php esc_html_e( '+'.$array["Mobile"]);?> </h5></b>
                                    <b><span><h5><?php  esc_html_e($return['resp_data']['payLoad']['product']['faceValue']).' '.esc_html_e("&nbsp;".$array['TransactionCurrencyCode']);?></h5></span></b>
                                </li>
                                <?php if(isset($return['resp_data']['payLoad']['topupDetail']['salesTaxAmount']) && ($return['resp_data']['payLoad']['topupDetail']['salesTaxAmount'] != 0 )){ ?>
                                <li>Local Currency Amount<span><?php esc_html_e($return['resp_data']['payLoad']['topupDetail']['localCurrencyAmount'] ?? '').' '.esc_html_e("&nbsp;".$return['resp_data']['payLoad']['topupDetail']['destinationCurrency'] ?? '') ?></span></li>
                                <li>Sales Tax <span><?php esc_html_e($return['resp_data']['payLoad']['topupDetail']['salesTaxAmount'] ?? '').' '.esc_html_e("&nbsp;".$return['resp_data']['payLoad']['topupDetail']['destinationCurrency'] ?? '') ?></span></li>     
                                <?php } ?>
                             <li>Delivered Amount <span><?php esc_html_e($return['resp_data']['payLoad']['topupDetail']['localCurrencyAmountExcludingTax'] ?? '').' '.esc_html_e("&nbsp;".$return['resp_data']['payLoad']['topupDetail']['destinationCurrency'] ?? '') ?></span></li>
                            </ul>
                        </div>

                        <div class="print-amount border-bottom-0 pb-0">
                            <ul class="ps-0 mt-3 mb-0">
                                <li>Topup Amount<span>
                                <?php esc_html_e($return['resp_data']['payLoad']['product']['faceValue']).' '.esc_html_e("&nbsp;".$array['TransactionCurrencyCode']); ?></span></li>

                                <?php if(isset($_SESSION["fees"]) && ($_SESSION["fees"] != 0 )){ ?>
                                <li>Fee <span>
                                <?php  esc_html_e($_SESSION['fees']).' '.esc_html_e("&nbsp;".$array['TransactionCurrencyCode']); ?></span></li>
                                <?php } ?> 
                             
                                <?php if(isset($_SESSION["convenienceFee"]) && ($_SESSION["convenienceFee"] != 0 )){ ?>
                                <li>Convenience Fee <span>
                                <?php  esc_html_e($_SESSION["convenienceFee"]).' '.esc_html_e("&nbsp;".$array['TransactionCurrencyCode']); ?></span></li>
                                <?php } ?>                    
               
                                <li><b>Total Amount Charged</b> <span><b>
                                <?php  esc_html_e($_SESSION['total_amount_paid_int_usd']).' '.esc_html_e("&nbsp;".$array['TransactionCurrencyCode']); ?></b></span></li>
                            </ul>
                        </div> 

                        <div class="print-amount border-bottom-0 pb-0">
                            <ul class="ps-0 mt-3 mb-0">                               
                                <li>Transaction Id <span><?php  esc_html_e($return['resp_data']['payLoad']['transactionId']);?></span></li> 
                                <li>Operator Trx Id <span><?php esc_html_e($return['resp_data']['payLoad']['topupDetail']['operatorTransactionId']) ?? '-'; ?></span></li>                        
                            </ul>
                        </div>
 
                      </div>
             
            <?php } ?>
        </div> 
<?php } ?>