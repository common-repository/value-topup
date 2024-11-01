<div id='value_topup_content_box'>
 
<?php if(!wp_doing_ajax()){?>
    <script>
        var topup_ajaxurl = "<?php echo esc_url(admin_url('admin-ajax.php'));?>";
        var topup_plugin_homeurl = "<?php echo plugins_url('topup'); ?>";
        var topup_homepage_url = "<?php echo get_home_url(); ?>"
        var topup_processing = "<?php echo home_url().'/topup-response'; ?>";
    </script>
<?php } ?> 
<div class="modal-box" style='position: fixed;'>
    <button type="button" class="btn" data-bs-toggle="modal" onclick="getDetails()" id='openBtnPlug' style='display:none'> Topup Mobile Phone 
        <img id='loader_init' style='display: none;' height='30px'src='<?php echo plugin_dir_url( dirname( __FILE__ ) ); ?>ss/assets/loadder.gif' ></img>
    </button>

    <!-- // data-bs-target="#exampleModal" -->
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
       
      <div class="modal-body">
        <section class="accordian-box">
            <div class="container">
              <div class="row justify-content-center align-items-center">
                <div class="col-lg-4">

                    <input type='hidden' id='user_currency' name='user_currency' value=''/>
                    <input type='hidden' id='category_select' name='category_select' value='2'/>
                    <input type='hidden' id='country_code' name='country_code' value=''/>
                    <input type='hidden' id='country_iso' name='country_iso' value=''/>   
                    <input type='hidden' id='currency_code' name='currency_code' value=''/>                    
                    <input type="hidden" id='productId_select' name="productId_select" value=''/>
                    <input type="hidden" id='productType_select' name="productType_select" value=''/>
                    <input type="hidden" id='convenienceFee_select' name="convenienceFee_select" value=''/>
                    <input type="hidden" id='exchangeRate_select' name="exchangeRate_select" value=''/>
                    <input type="hidden" id='skuName_select' name="skuName_select" value=''/>
                    <input type="hidden" id='fee_select' name="fee_select" value=''/>
                    <input type="hidden" id='skuId_select' name="skuId_select" value=''/>
                    <input type="hidden" id='salesTax_select' name="salesTax_select" value=''/>  
                    <input type="hidden" id='pv' name="pv" value=''/>  
                    <input type="hidden" id='pe_key' name="pe_key" value=''/>  
 

                  <div class="section-tittle">
                    
                    <h2 class="mb-0" id='heading_topup'>Topup Mobile Phone <img id='loader' style='display: none;' height='50px'src='<?php echo plugin_dir_url( dirname( __FILE__ ) ); ?>ss/assets/loadder.gif' ></img></h2> 
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal"  onclick="closeForm()" aria-label="Close"></button>  </div>
                    
                    <div class="description">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                           
                             <div class="accordion-item" style='display:none'>
                                <h2 class="accordion-header" id="flush-headingone">
                                    <button class="accordion-button collapsed btn-option-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseone" aria-expanded="false" aria-controls="flush-collapseone">
                                        <div class="country" ><i class="fa-solid fa-mobile-screen-button"></i>
                                            <span id="option"> Select Option</span> 
                                        </div>
                                        <div class="right-icon"><i class="fas fa-chevron-down fa-xs"></i>  </div>
                                    </button>
                                </h2>

                                <div id="flush-collapseone" class="accordion-collapse collapse" aria-labelledby="flush-headingone" data-bs-parent="#accordionFlushExample">
                                  <div class="accordion-body">
                                    <div class="country-code form-group mb-0">                                
                                        <div class="form-group md-group show-label">
                                          <!-- <input class="form-control phone-number-input" type="tel" id="phone"placeholder='Please enter mobile number' minlength='10' maxlength='10' value=""> -->
                                          <select class='form-control' id='option_val' onclick="option_next_btn()">
                                              <option value=''>Select Option</option>
                                              <option value='1'>Pin</option>
                                              <option value='2'>Topup</option> 
                                          </select>
                                        </div>
                                    </div>
                                    <div class="next-btn" > <a class="next"  style='display:none' href="#"  onclick="open_mobile()" id="option_next_btn">Next</a></div>
                                  </div>

                                </div>
                            </div> 

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingtwo">
                                    <button class="accordion-button collapsed btn-mobile-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseten" aria-expanded="false" aria-controls="flush-collapseten">
                                        <div class="country" ><i class="fa-solid fa-mobile-screen-button"></i>
                                            <span id="title_phone"> Mobile Number</span> 
                                        </div>
                                        <div class="right-icon"><i class="fas fa-chevron-down fa-xs"></i>  </div>
                                    </button>
                                </h2>

                                <div id="flush-collapseten" class="accordion-collapse collapse show" aria-labelledby="flush-headingtwo" data-bs-parent="#accordionFlushExample">
                                  <div class="accordion-body">
                                    <div class="country-code form-group mb-0">                                
                                        <div class="form-group md-group show-label">
                                            <div class="input-group">

                                                <span class="input-group-text left-cornner input_id">
   
                                                 <div class="dropdown">
                                                  <button type="button" class="btn btn-primary dropdown-toggle" style='background-color: transparent;padding: 5px 0px 6px 27px!important; ' data-toggle="dropdown">
                                                    <img src='' id='select_img_country' style='margin-left: -16px !important;' height='25px' width='25px'>
                                                  </button>
                                                  <div class="dropdown-menu" id='dropdown-menu' style='margin-top: 6px;'>
                                                     
                                                  </div>
                                                </div>
                                                    
                                                </span>
                                                 
                                                  <input type="text" name="" id='cc' readonly style='width: 50px;    text-align: right;' class='input_id'>
                                                <input type="text" class="form-control input_id" type="tel" autocomplete="off" id="phonenew" pattern="\d*" style='margin-left:0px!important;border-top-right-radius: 21px; border-bottom-right-radius: 20px;box-shadow:none' class="form-control">
                                            </div>
                                         
                                        </div>
                                        <label class='error' id='phone_error'></label>
                                    </div>
                                    <div class="next-btn" style='margin-top: -17px'> <a class="next"  style='display:none' href="#"  onclick="open_operator()" id="operator_next_btn">Next</a></div>
                                    <center><img id="spinner_open_operator" style="display:none" height='18px'src='<?php echo plugin_dir_url( dirname( __FILE__ ) ); ?>ss/assets/loadder.gif' ></center>
                                  </div>
                                </div>
                            </div> 

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingthree">
                                    <button class="accordion-button collapsed btn-operator-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsethree" aria-expanded="false" aria-controls="flush-collapsethree">
                                        <div class="country  operators_label"><i class="fa-solid fa-tower-broadcast"></i> Select Operator</div>
                                        <div class="right-icon"><i class="fas fa-chevron-down fa-xs"></i></div>
                                    </button>
                                </h2>
                                <div id="flush-collapsethree" class="accordion-collapse collapse" aria-labelledby="flush-headingthree" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="top-up-box">
                                            <div class="opretor-section" id='op_selectior'>
                                            <h4>Operator</h4>
 

                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingfour">
                                  <button class="accordion-button collapsed btn-amount-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
                                   <div class="country amount_label"><i class="fa fa-money-bill"></i>Amount</div>
                                   <div class="right-icon">
                                     <i class="fas fa-chevron-down fa-xs"></i>
                                   </div>
                                  </button>
                                  </h2>
                                <div id="flush-collapsefour" class="accordion-collapse collapse" aria-labelledby="flush-headingfour" data-bs-parent="#accordionFlushExample">
                                  <div class="accordion-body">

                                    <div class="top-up-box">

                                      <div class="opretor-section">
                                        <div class="prize-box">
                                          <h5>Amount</h5>
                                          <p id='range'></p>
                                        </div>
                                        <div class="mb-0">
                                            <span id='elem'></span>
                                             <span id="elem2" > 
                                                <input class="form-control" type='number' name='input_amount_val' id='input_amount_val'  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength = "10" pattern="\d*" maxlength="4" title="Numbers only" value='' placeholder='Enter Topup amount'>
                                                <br/>
                                                <label class='error' id='input_num_error'></label>

                                            </span> 
                                          
                                        </div>
                                        
                                        <span class='details'>
                                                <span id='display_value'></span>
                                                <button id='pp' onclick="proceed_to_pay()" class="btn next" type="button"> Next </button>
                                        </span>
                                    
                                      </div> 

                                    </div>

                                  </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingthree">
                                  <button class="accordion-button collapsed btn-card-accordion" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefive" aria-expanded="false" aria-controls="flush-collapsefive">
                                   <div class="country card_label"><i class="fa-solid fa-credit-card"></i>Credit/Debit Card Details</div>
                                   <div class="right-icon">
                                     <i class="fas fa-chevron-down fa-xs"></i>
                                   </div>
                                  </button>
                                  </h2>
                                <div id="flush-collapsefive" class="accordion-collapse collapse" aria-labelledby="flush-headingthree" data-bs-parent="#accordionFlushExample">
                                  <div class="accordion-body">
                                    <div class="top-up-box">
                                      <div class="opretor-section">
                                        
                                        <img id='payl' style='display:none' height='18px'src='<?php echo plugin_dir_url( dirname( __FILE__ ) ); ?>ss/assets/loadder.gif' >

                                        <span id='opt_topup_2'>  

                                            <form id="payment-form" style='opacity: 1;'>
                                               
                                                <div id="payment-element"> 

                                                </div> 
                                                
                                                <button id="submit" style='border:none;background-color: white;margin: 0px 29%;'>
                                                    <div class="spinner hidden" ></div>
                                                    <span id="button-text" class='btn next pickval' style='margin-top: 10px;display:none;width:140px'>Pay Now 
                                                        <span><img id="spinner" height='18px'src='<?php echo plugin_dir_url( dirname( __FILE__ ) ); ?>ss/assets/loadder.gif' ></span>
                                                    </span>

                                                </button>
                                                <div id="payment-message" class="hidden"></div> 
                                            </form> 
 

                                        </span>
                                      </div>
                                       
                                    </div>
                                  </div>
                                </div>
                            </div>

                          
                        </div>
                    </div>
                </div>

              </div>

            </div>
          </section>

      </div>
    </div>
  </div>
</div>
 </div>