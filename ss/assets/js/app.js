$ = jQuery.noConflict();

!function(a){"use strict";var s="accordionForm",n={start:1,mode:"accordion",enableScrolling:!0,scrollPadding:5,autoButtons:!0,autoButtonsNextClass:null,autoButtonsPrevClass:null,autoButtonsShowSubmit:!0,autoButtonsSubmitText:"Submit",autoButtonsEditSubmitText:"Save",stepNumbers:!0,stepNumberClass:"",beforeNextStep:function(t){return!0},onSubmit:function(t){return!0}};function e(t,e){this.element=t,this.settings=a.extend({},n,e),this._defaults=n,this._name=s,this.init()}a.extend(e.prototype,{init:function(){var i=this;this.$steps=a("[data-acc-step]"),this.stepHeight=a("[data-acc-step]").eq(0).outerHeight(),this.settings.stepNumbers&&this.$steps.each(function(t,e){a("[data-acc-title]",e).prepend('<span class="acc-step-number '+i.settings.stepNumberClass+'">'+(t+1)+"</span> ")}),this.settings.autoButtons&&this.$steps.each(function(t,e){var s,n=a("[data-acc-content]",e);0<t&&n.append('<a href="#" class="'+i.settings.autoButtonsPrevClass+'" data-acc-btn-prev>Back</a>'),t<i.$steps.length-1?n.append('<a href="#" class="'+i.settings.autoButtonsNextClass+'" data-acc-btn-next>Next</a>'):i.settings.autoButtonsShowSubmit&&(s="accordion"==i.settings.mode?i.settings.autoButtonsSubmitText:i.settings.autoButtonsEditSubmitText,n.append('<input type="submit" class="'+i.settings.autoButtonsNextClass+'" value="'+s+'">'))}),this.currentIndex=this.settings.start-1,"accordion"==this.settings.mode?(this.activateStep(this.currentIndex,!0),a("[data-acc-btn-next]").on("click",function(){i.settings.beforeNextStep(i.currentIndex+1)&&i.activateStep(i.currentIndex+1)}),a("[data-acc-btn-prev]").on("click",function(){i.activateStep(i.currentIndex-1)})):"edit"==this.settings.mode&&(this.activateAllSteps(),a("[data-acc-btn-next]").hide(),a("[data-acc-btn-prev]").hide()),a(this.element).on("submit",function(t){i.settings.onSubmit()||t.preventDefault()})},deactivateStep:function(t,e){this.$steps.eq(t).removeClass("active")},activateStep:function(t,e){this.$steps.removeClass("open");var s=t>this.currentIndex?this.stepHeight:-this.stepHeight;!e&&this.settings.enableScrolling&&a("html").animate({scrollTop:this.$steps.eq(this.currentIndex).offset().top+(s-this.settings.scrollPadding)},500),a("[data-acc-content]",this.element).slideUp(),this.$steps.eq(t).addClass("open").find("[data-acc-content]").slideDown(),this.currentIndex=t},activateNextStep:function(){this.activateStep(this.currentIndex+1)},activateAllSteps:function(){this.$steps.addClass("open"),a("[data-acc-content]",this.element).show()}}),a.fn[s]=function(t){return this.each(function(){a.data(this,"plugin_"+s)||a.data(this,"plugin_"+s,new e(this,t))})}}(jQuery,(window,document));
 
var data_param = [];

$('.pickval').on('click',function(){

    $('#amount_selected').html($(this).attr('rel'));
    $('#ss_val').html($(this).attr('rel'));
    $('.details').show();
    $(this).addClass('active');
});

 
$('document').ready(function(){  
   // load();
   $('#openBtnPlug').show();
    if(localStorage.getItem('topup_data_categories')==null || localStorage.getItem('topup_data_countries')==null || localStorage.getItem('topup_data_products')==null || localStorage.getItem('topup_data_products')=='undefined' || localStorage.getItem('topup_data_categories')=='undefined' || localStorage.getItem('topup_data_countries')=='undefined' ) {
      
        
    }else{
        localStorage.removeItem("topup_data_categories");
        localStorage.removeItem("topup_data_countries");
        localStorage.removeItem("topup_data_products"); 
        localStorage.removeItem('settings');
        localStorage.removeItem('customerWalletCurrencyCode');      

        //load();
    }
});

function load(){

  //------------------- init intl input --------------------  
    var input = document.querySelector("#phonenew"); 
    let countryList  = [];
    var detailsList = JSON.parse(localStorage.getItem("topup_data_countries"));    
    let countrlistArr = detailsList.map(x => x.countryCode.toLowerCase());  
    let options_val_country = '';
    $(detailsList).each(function(item, index) {
        options_val_country += '<a class="dropdown-item"  data-imageUrl="'+index.imageUrl+'" data-currencyCode="'+index.currencyCode+'" data-countryCode="'+index.countryCode+'" data-countryName="'+index.countryName+'" data-prifixCodes="'+index.prifixCodes[0]+'" href="#"><img height="20px" width="20px"  src='+index.imageUrl+'/> '+index.countryName+'</a>';
    });

    $('.dropdown-menu').html(options_val_country);
      
    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    var reset = function() { 
    $('#phonenew').removeClass('border-danger');
        input.classList.remove("error");
        $('#edit_op').show();
        $('#lbl_operator').show();
    };
    // on keyup / change flag: reset
    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);
    //return iti;
}
//--------intel input end  -------------

function getUI() {
   var print = function(msg) {
    // alert(msg);
   };

   var setInvisible = function(elem) { elem.css('visibility', 'hidden'); };
   var setVisible = function(elem) { elem.css('visibility', 'hidden');  };//{ elem.css('visibility', 'visible');  };
   var elem = $("#elem");
   var items = elem.children();
   // Inserting Buttons
   elem.prepend('<div id="right-button" style="visibility: hidden;"><a href="#"><</a></div>');
   elem.append('<div id="left-button"><a href="#">></a></div>');
   items.wrapAll('<div id="inner" />');
   elem.find('#inner').wrap('<div id="outer"/>');
   var outer = $('#outer');
   var updateUI = function() {
     var maxWidth = outer.outerWidth(true);
     var actualWidth = 0;
     $.each($('#inner >'), function(i, item) { actualWidth += $(item).outerWidth(true); });
     if (actualWidth <= maxWidth) {  setVisible($('#left-button'));  }
   };
   updateUI();

   $('#right-button').click(function() {
     var leftPos = outer.scrollLeft();
     outer.animate({
       scrollLeft: leftPos - 200
     }, 800, function() {
        
       if ($('#outer').scrollLeft() <= 0) {
         setInvisible($('#right-button'));
       }
     });
   });

   $('#left-button').click(function() {
     setVisible($('#right-button'));
     var leftPos = outer.scrollLeft();
     outer.animate({
       scrollLeft: leftPos + 200
     }, 800);
   });

   $(window).resize(function() {
     updateUI();
   });
 } 

function operatoreSelect(that){

    let prodId = $(that).data('id');
    let prodImg = $(that).attr('data-imageUrl');
    let prodName = $(that).attr('data-productName'); 
    $('.operators_label').html('<i class="fa-solid fa-tower-broadcast"></i> '+prodName); 

    $('.opretor-blog.active').removeClass('active');
    $('.opretor-blog[data-id='+prodId+']').addClass('active')
    $('#amount_selected').html('');
    $('#display_value').html('');
    $('#elem2').hide();
    $('#elem').hide();
    $('.details').hide();  
    let op_nm = prodId; 
    let op_nm_text = prodName; 
    let img_operator = prodImg; 
    let img_url = img_operator+'?time='+Math.random();    
    $('#operator').html(op_nm_text);
    $('#productId_select').val(op_nm); 
    $('#op_img').attr('src',img_url);        
    $('#op_img').show(); 
    // $('#phonenew').val('');    
    // $('#country_code').val('');
    // $('#country_iso').val('');
    $('#input_amount_val').val('');

    getAmountConfList();
    $('#loader_am_ck').hide();
    $('#lbl_operator').hide()    
     $('.btn-amount-accordion').trigger('click');
}

function proceed_to_pay(){
    var total_amount_paid_usd = parseFloat($('#pv').val()).toFixed(2)
    let data_param = {'amount': total_amount_paid_usd} ; 
    $('#payl').show();
    $('#payment-element').html('');
    $('#button-text').hide();
    //---------- initialize payment-------------- 
    initialize(data_param);
    
    $('#opt_topup_2').show();
    $('.btn-card-accordion').trigger('click'); 
}
 

function option_next_btn(){
    var option_val = $('#option_val').val(); 
    if(option_val=='' || option_val==undefined){
        $('#option_next_btn').hide();
    }else{
        // console.log(option_val);
         $('#option_next_btn').show();    
        if(option_val=='1'){
            $('#heading_topup').text('Pin');
        }else{
            $('#heading_topup').text('Topup');
        }
       
    }
}

function open_mobile(){
    $('.btn-mobile-accordion').trigger('click');
}

function open_operator(){
    $('#spinner_open_operator').show(); 
    getMobileOp();
}
 

function getDetails(){
    $('#loader_init').show(); 
    var data = { 'action'   : 'call_catelog_api'}; 
    $.ajax({ 
        url : Topup_Ajax_bject.ajax_url,
        data : data, 
        success:function(response_data) { 
        $('#loader_init').hide(); 
            var data = $.parseJSON(response_data); 
            if(data.flag==1){ 
                localStorage.setItem("topup_data_categories", JSON.stringify(data.resp_data.catalog.categories));
                localStorage.setItem("topup_data_countries", JSON.stringify(data.resp_data.catalog.countries));
                localStorage.setItem("topup_data_products", JSON.stringify(data.resp_data.catalog.products));
                localStorage.setItem("customerWalletCurrencyCode", JSON.stringify(data.resp_data.catalog.customerWalletCurrencyCode));
                localStorage.setItem("settings", JSON.stringify(data.resp_data.catalog.settings));
                    $('#exampleModal').modal('show');
               // $('#openBtnPlug').show();
               $('#loader_init').hide();
               load(); 
               openForm();
            }
            if(data.msg=='No config found'){
                alert("Unable to Load plugin due to setup is incomplete");
            } 
        },
        error: function (jqXHR, exception) {  
            $('#loader_init').hide();
         // console.log(jqXHR)  
        }
    });
}
 
function openForm() {
 
    $('.accordion-collapse.collapse').removeClass('show');
    $('#flush-collapseten').addClass('show'); 
    $('#phonenew').attr('placeholder','Select Country');

    //======== reset form data  =========
    $('#opt_topup').show();
    $('#opt_topup_2').hide();
    $('.details').hide();
    $('#elem2').hide();
    $('#elem').hide();

    $('#productId_select').val('');
    $('#productType_select').val('');
    $('#salesTax_select').val('');
    $('#convenienceFee_select').val('');
    $('#exchangeRate_select').val('');
    $('#skuName_select').val('');
    $('#fee_select').val('');
    $('#skuId_select').val('');
    $('#phone_error').text('');

    $('#op_selectior').html('');
    $('.amount_label').html('<i class="fa fa-money-bill"></i> Amount');
    $('.operators_label').html('<i class="fa-solid fa-tower-broadcast"></i> Select Operator');
    $('.opt_topup_2').html('');
    $('#range').html('');
    $('#title_phone').html('Select Country');
    $('#option').html('Select Option');
    $('#input_amount_val').val('');
    $('#phonenew').val('');
    $('#select_img_country').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAACHCAMAAAAMV6ZoAAAA8FBMVEX///8RktaO0SoREiT4+PgwMDQJCyEAj9sAjdQAj9UAjtyP0iYODyIAj9mV1gAAi9SS1BoAjN8AABuGzgAAAAAAh9OK0Bk7m9nx9/z2+/HO4/Oh2FvT7LjL6anp8/pqanGUw+dbspCGzEApmcZWrptVpdxftIh5xFsblNBxtOJvvm6hzOs8obNNq590wWbE5p/w+ecrLDkAABNbXGRAQEtQUVpptqyc2DqX1EWu3XXe8Mq/5JVApaxVr5Xo9dq034C51+98x0cAh+Rjt4Fpu3gznbt9x1NJqKaRy5zf7+ggIS56e4GUlZmrrLBISUvMzM2O29fdAAAGpUlEQVR4nO2aDXeaSBSGRVthGAcHjZrVRlQ0okEbRXeT1jSx8WMrtvv//83eARUEbHIAk7Nnec9ppIbwcD/njphKJUqUKFGiRIkSJUqUKNH/TH8wvQO3Xr3pdSp//nV3d1er3V99ecN7qDY6XCkvIEGVMFO5WMS1r9/eAl1vcCUBcUxkJqX3glvAX2/PzK72kMDtJT7QtEu4jO/P6YC6mw305hEdVC4/ns3+m7ybDfS2lw784tVZ2NVKnjuWsJR89HS6WDuD+584xHmltXAAHqc/xQ2/8RrOxLelQHzc3u+VAuAQ+UFakvzBTxcfY4ULgXAoeaIunwPw5fsY4UFu3wkRuU2xLwDxWR8Yc3f4m/M59Tqg+Dke+NMLcAi/LH/ve80vxpL51ZfYFl/1FR9Ox1H3FX+de0PPi3oroO3dRYe/FHRoedpgGFj30cu+fqrWHMs1TIPYzPqoS45T6UTkvWAi8ATxs4B6j6fqq+jA1ptt4rH6ubuYadrcY7nLFTha4u1NF5dziUr9IzxaUkwlyRtyumr3d97AUi0KfB91WMmBgVvuXJOFdVC4pWciyjYez9eDHxHoDZtO9DID0YVjO1EX86BQ076IOGRXv8TxciMCfYeSV+xiuEUOpQ/3E5jouGWdwlvzpiTDYXh4dbeuImuGwbpjOh9Y4Mz076LII07U4eYkuJNSNTR953jE2RPU0jE9cKaytGi32yrh+OVKmoPtQiMs/ENnh5PtMA4OtiP1JJ0yLQlHOF2FP0edDyHp9T1MvIYclvqak/Hitb/UjlKP3aJ97/WQ9H3YYdOCIeqyu9h5UVt3MUxVQY0Od52VKXTgDwsM0jG9FrljIR6pS1ULmqvc9PxNSHpvfw3W1QIGavAtEmcBGYCHTnWgXkh6xwH2Z74lxpUSvrgvHEehTkh6xYGQUwut3A3IPfrs3CuqhINfVk4Qj+hWG/QMtbjv8lTl8oz0voQpvdZXbjxeuc44J53jnocPvCh7wq86KXNWOoLpBnFy/4hO34puSx4eeR5Hp79ilj7IKTwMHXi+dkokbM676/21tmPa1zlZdE1goeu992q6Y/qa54//KnSve3kjsRMZ7NotvZa9vwvd56uujwwIz/OnNxb7TZw713cKvcYd1nfYr6wfHtr6CTzR9ysN1vzBCru+s7Qj1iRJuhJMLJJO/GgQP7SiDmd0ffDQSQdznSwvIYVhkLIsk/x+tQBqy2I/D3T/Mhx+rktVH9hepa/JA2Yc7UNKIRH5xgwVapz2kUwCbi7CTJuyli7aGlhZhSHuvNptLbxLvaBfD1T+RHmGh6c+l+0WYqe0xoszWEylgRdPxFPsCI5PpW7L7u7dXlprCV55fX9aQuiMZ7p34+nugylpGRjiIHjYRmfrW/BmDbbtr8NHyDmf8Qc8lVqvwUc03RP5E/ODX7ttDIoUdaarYiC8eWLCZiLcUmVdMfQC49JdQOhx+jdpT5Zzyva7oecKt4J8T5un6USFHiWBb6JV215f/L7H+m+iDo2RdjmUf4oDDh3Ph6cPvimCs2YAmG6bNI3nGso34oGnUo8+5+Olv7nys+FA43XKuiEqRS02l/xVLw0HqnzE59cShf28/RFP+u/44GD9wfn7j6pg/7TS3NMGn3aKI97nMvvVDrSYH3YtgHesJ7qzmynH9FzC0aeitdYPviNn00S7TvLxhweTOJ6nEse6rRXBt9A+5ZWDnxEfvVg7z6PYK1xcseFKOzifDg8NF6nWm2V8nuewoNv7IXM10Ya73MMrp93Lc5wul+/P+Qz+R68ksNFy1oJBEkbOtZP1crdYPOvzd6bLRqUkICKr62YTmsvB8UKp9vktvn1xyb53IeRF0W53CAl5gev0qm/3zY/6002vY31gx1U6vZunWJazRIkSJUqUKFGiRIkSJfqP6MN7KvXxPZXKvqdSmUwmB4KXbIYdjwsF9popZArWG2cV0HOT0WY0zo4nhfF4/NFUjPHFeHyhXEwn0fCWSex1989+z9GOvlEmpvlLMQ1FUcztr5/KT9Pc/txOJrkT130dfLMZF3LZQm6ULRQ27AheR6DNaLOBn5ucRc+MDRPIY8XYGMqFAehf2+3FP9uLSPBMwbDtUUxFMczpyICfxlQx4b9wZJrTgk3PTo2pMVEmhqFMJlv49RbOMc1RNHpuNFWmU7ikMoULTydTBhgZ8NaIvT+ZZm16JpfNbrIbCA5EY1OAbIPMy0bOuZyV1uBy8Hg2Z3k+myvAQa4A7+fY9VP7UzPeg7dQ6uVTzqh/AbokufvBQV6aAAAAAElFTkSuQmCC');
    $('#operator_next_btn').hide();
    $('#cc').val('');

    $('#country_code').val('');
    $('#country_iso').val('');
    $('#currency_code').val('');
    $('#user_currency').val(''); 
    $('#pe_key').val(''); 

    $('#option_val').on('change',function(){
        var option_val = $('#option_val').val(); 
        if(option_val=='' || option_val==undefined){
            $('#option_next_btn').hide();
        }else{
            $('#option_next_btn').show();    
        }
    }); 
    
}
 

function getOperatorList(){
    var input2 = document.querySelector("#phonenew");  
    let country_iso = $('#country_iso').val();// iti.getSelectedCountryData().iso2.toUpperCase();
    var all_products = JSON.parse(localStorage.getItem("topup_data_products"));   
   
    let result =all_products.filter(activity => (activity.countryCode==country_iso));
    let categories_id = $('#category_select').val();
    let final_result =result.filter(activity_new => (activity_new.categoryId==categories_id)); 
    $('#op_selectior').html(''); 
 
    let operator_list = '';
    $(final_result).each(function () { 
        let option = '<div class="opretor-blog" data-id="'+this.productId+'" data-productName="'+this.productName+'" data-imageUrl="'+this.imageUrl+'" onClick="operatoreSelect(this)"><div class="opretor-blog-img"><img class="img-fluid" src="'+this.imageUrl+
         '" alt=""></div><div class="opretor-blog-body"><p>'+this.productName+'</p><!--<a href="#" class="btn hide">Change</a>--> </div></div>';
        operator_list += option;

    });
    $('#op_selectior').html(operator_list);

    return final_result; 
}


function getCountryList(){
    let country_code =  $('#country_code').val();// iti.getSelectedCountryData().iso2.toUpperCase();
    var all_countries = JSON.parse(localStorage.getItem("topup_data_countries"));
    return all_countries.filter(activity => (activity.countryCode==country_code));
  
}

function getMobileOp(){
    getOperatorList();
    var input2 = document.querySelector("#phonenew"); 
   

    $('#loader_ck_op').show(); 
    var mobileno_old =  $('#country_code').val()+$('#phonenew').val().trim();
    var mobileno = mobileno_old.replace("+", "");
     
    $('#phone_error').text('');
    $.ajax({
            // url: "ajax_content.php?action=mobileOp", 
            url : Topup_Ajax_bject.ajax_url, 
            method : 'post',
            data: { 'mobile': mobileno ,'action' : 'call_mobile_op_api'},
            success:function(response_data) { 
                $('#loader_ck_op').hide(); 
                $('#title_phone').html(mobileno); 
                var data = $.parseJSON(response_data); 
                if(data.flag==1){
                    if(data.resp_data.responseCode==='000'){ 
                        $('#operator').html(data.resp_data.payLoad.operator+data.resp_data.payLoad.productId);
                        $('#productId_select').val(data.resp_data.payLoad.productId);
                        $('#productType_select').val(data.resp_data.payLoad.productType);

                        let prodId = data.resp_data.payLoad.productId; 
                        let prodName = $('.opretor-blog[data-id='+prodId+']').attr('data-productName'); 
                        $('.operators_label').html('<i class="fa-solid fa-tower-broadcast"></i> '+prodName);
                        $('.opretor-blog.active').removeClass('active');
                        $('.opretor-blog[data-id='+prodId+']').trigger('click');//addClass('active');
                        // $('.btn-operator-accordion').trigger('click');
                        $('#spinner_open_operator').hide(); 
                    }else{
                        // console.log("Error Msg :: "+data.resp_data.responseMessage);   
                        $('#op_img').hide(); 
                        $('#operator').html(''); 
                        $('.btn-operator-accordion').trigger('click');
                        $('#spinner_open_operator').hide(); 
                    }

                }else{
                    $('#spinner_open_operator').hide();
                    $('#phone_error').html('Failed to process your request, <br/>Please try again after sometime ');
                    // console.log('Failed : '+data.msg);
                }
                $('.accordion-collapse.collapse').eq(1).removeClass('show');
            },
            error: function (jqXHR, exception) {
                $('#loader_ck_op').hide(); 
            }
        }) 
}

function getAmountConfList(){  

    let productId = $('#productId_select').val();
    let country_iso =  $('#country_iso').val().replace('+','');
    var all_products = JSON.parse(localStorage.getItem("topup_data_products"));     
    let result =all_products.filter(activity => (activity.countryCode==country_iso));
    let result_new = result.filter(activity => (activity.productId==productId)); 
 
    $('#productType_select').val(result_new[0].productType); 
    $('#salesTax_select').val(result_new[0].salesTax ?? 0);
    
    $('#elem').hide();
    $('#elem2').hide();

    $('#elem').html('');
    $('#range').html('');
    $('#input_amount_val').val('');
    var user_currency = $('#user_currency').val();

    if(result_new[0].productType=='Variable' || (result_new[0].skus[0].faceValue==0.01 && result_new[0].skus[0].min!=result_new[0].skus[0].max)){

        //---------input validataion --------------
        $('#elem2').show();
        $('#start_amt').text(result_new[0].skus[0].min);
        $('#end_amt').text(result_new[0].skus[0].max);

        $('#range').text('('+result_new[0].skus[0].min+' '+user_currency+' - '+result_new[0].skus[0].max+' '+user_currency+')')
        $('#convenienceFee_select').val(result_new[0].skus[0].convenienceFee);
        $('#exchangeRate_select').val(result_new[0].skus[0].exchangeRate);
        $('#skuName_select').val(result_new[0].skus[0].skuName);
        $('#fee_select').val(result_new[0].skus[0].fee);
        $('#skuId_select').val(result_new[0].skus[0].skuId);
         $("#input_amount_val").attr({
           "data-max" : result_new[0].skus[0].max, 
           "data-min" : result_new[0].skus[0].min  
        });



    }else if(result_new[0].productType=='Fixed'){

        $('#elem').show();       
        //---------input button enable --------------
        if(result_new.length > 0){
            let list_skus = result_new[0].skus;
            // console.log(list_skus);
            $('#fee_select').val(result_new[0].skus[0].fee ?? 0);
            $('#skuId_select').val(result_new[0].skus[0].skuId);
            $('#skuName_select').val(result_new[0].skus[0].skuName);
            $('#convenienceFee_select').val(result_new[0].skus[0].convenienceFee);
            $('#exchangeRate_select').val(result_new[0].skus[0].exchangeRate);
            if(list_skus.length > 0){            
                let allList = [];
                if(result_new[0].skus[0].faceValue==0.01 && result_new[0].skus[0].min == result_new[0].skus[0].max){
                    $(list_skus).each(function () {  
                        allList.push('<label><button type="button" class="btn btn-primary btn-sm pickval" id='+this.skuId+' onclick="openDetails(\''+ this.min +'\',\''+this.skuName+'\',\''+this.convenienceFee+'\',\''+this.fee+'\',\''+this.exchangeRate+'\',\''+this.skuId+'\')"  type="button"> '+ this.min +'  </button></label>');
                    });
                }else{
                     $(list_skus).each(function () {  
                        allList.push('<label><button type="button" class="btn btn-primary btn-sm pickval" id='+this.skuId+' onclick="openDetails(\''+ this.faceValue +'\',\''+this.skuName+'\',\''+this.convenienceFee+'\',\''+this.fee+'\',\''+this.exchangeRate+'\',\''+this.skuId+'\')"  type="button"> '+ this.faceValue +'  </button></label>');
                    });
                }               
                $("#elem").html(allList.join(''));
                getUI();
            }
        }    
    }else{
        // console.log('else ---')
    }
    
}

function openDetails(amt,skuName,convenienceFee,fee,exchangeRate,skuId){
     
  
     
    $('.pickval').removeClass('active');
    $('#'+skuId).addClass('active');
    
     let productId = $('#productId_select').val();
    let country_iso =  $('#country_iso').val().replace('+','');
    var all_products = JSON.parse(localStorage.getItem("topup_data_products"));     
    let result =all_products.filter(activity => (activity.countryCode==country_iso));
    let result_new = result.filter(activity => (activity.productId==productId));
     let list_skus = result_new[0].skus; 
    //  console.log(parseInt(skuId));
     if(skuId!=''){
         // console.log(list_skus);
         let selected_sku = list_skus.filter(activity => (activity.skuId== parseInt(skuId)));
         // console.log(selected_sku[0].fee);
         $('#fee_select').val( selected_sku[0].fee);
         
          var fees  = selected_sku[0].fee;  
     }else{
         var fees  = $('#fee_select').val();  
     }
    // console.log(fees);
    $(this).addClass('active');
    let total_amount_paid_int = 0;
    let total_amount_paid_int_usd = 0;
    let country_code =  $('#country_iso').val();
    let currencyCode = $('#currency_code').val();
    let country_code_int =  $('#country_code').val().replace('+','');
    let operators_label = $('.operators_label').text().trim();
    let salesTax_select = $('#salesTax_select').val();
     
     // console.log('salesTax_select '+ typeof(salesTax_select) + salesTax_select);

    amt = parseFloat(amt);
    exchangeRate = parseFloat(exchangeRate);
    convenienceFee = parseFloat(convenienceFee);
    fee = parseFloat(fee);
    exchangeRate = parseFloat(exchangeRate);

    let total_amount_paid = (amt*exchangeRate) + convenienceFee + fee;
    let total_amount_delivery_amt = parseFloat(amt*exchangeRate);
    total_amount_paid_int = parseFloat(total_amount_paid);
    let total_amount_paid_usd = parseFloat(amt + convenienceFee + fee);    
    total_amount_paid_int_usd = parseFloat(total_amount_paid_usd);
 

    let mobile_number  = $('#phonenew').val().trim();  
    // let skuId  = $('#skuId_select').val(); 
    
    let imgUrl = $('.opretor-blog.active').attr('data-imageurl');
    let user_currency = $('#user_currency').val();
    
    $('#amount_selected').html(amt+' '+user_currency);

    let display = '<ul class="ps-0 mb-0" style="margin-top: -33px;" >'; 

    if(country_code != user_currency){
        display += '<li> Delivery Amount : <span>'+total_amount_delivery_amt.toFixed(2)+' '+ currencyCode;
        if(salesTax_select != 0){
            display += '<small>(includes Sales Tax)</small></span></li>';
        }else{
            display += ' </span></li>';
        }
    }

 

    if(fees!=0){   display += '<li> Fee : <span>'+parseFloat(fees).toFixed(2)+' '+user_currency+'</span></li>'; }

    if(convenienceFee!=0){   display += '<li> Convenience Fee : <span>'+parseFloat(convenienceFee).toFixed(2) +' '+user_currency+'</span></li>';  }
 
     
     display += "<li> Total Amount  : <span>"+parseFloat(total_amount_paid_int_usd).toFixed(2)+' '+user_currency+'</span></li></ul>'; 
   
    $('#display_value').html(display);
    $('.details').show();

    $('.amount_label').html('<i class="fa fa-money-bill"></i> ' + total_amount_paid_usd.toFixed(2) +' '+user_currency);
    $.ajax({
        async: false,
         url : Topup_Ajax_bject.ajax_url,  
        // url: "ajax_content.php?action=set",
        method : 'post', 
        data: {
                'total_amount_paid_int'     : amt,
                'mobile_number'             : mobile_number, 
                'skuId'                     : skuId,
                'fees'                      : parseFloat(fees).toFixed(2),
                'convenienceFee'            : convenienceFee,
                'total_amount_paid_total'   : total_amount_paid_int,
                'imgUrl'                    : imgUrl,
                'total_amount_paid_int_usd' : total_amount_paid_int_usd.toFixed(2),
                'country_code'              : country_code,
                'country_code_int'          : country_code_int,
                'operators_label'           : operators_label,
                'user_currency'             : user_currency,
                'allkey'                    : localStorage.getItem('settings'),
                'action'                    : 'call_set_data'
            },
        success:function(response_data) { 
            var respv = $.parseJSON(response_data);
            $('#pe_key').val(respv.pe_key); 

            //-----------------start -----------------------
             if(mobile_number=='' || skuId=='' || amt=='' ){
                alert("Please fill all the details "); return false;
            }else{
                if(amt == 0.01 || amt < 1 ){
                    alert('Invalid amount');
                    return false;
                }

                $('#pv').val(total_amount_paid_usd.toFixed(2));            
                let data_param = {'skuName':skuName,'amount': total_amount_paid_usd.toFixed(2),'convenienceFee':parseFloat(convenienceFee).toFixed(2),'Fee':parseFloat(fees).toFixed(2),'mobile':mobile_number} ; 
                $('#payment-element').html('');
                $('#button-text').hide();
                //---------- initialize payment-------------- 
              
            }
            //----------------------end ------------------------
        } 
    })
    
}
 

function closeForm() {
  //document.getElementById("myForm").style.display = "none";
}

function openTopupForm(){
    // document.getElementById("opt").style.display = "none";
    // document.getElementById("opt_topup").style.display = "block";
}

function openPinForm(){
    // document.getElementById("opt").style.display = "none";
    // document.getElementById("opt_pin").style.display = "block";
}

$(function(){
    $('.list-group-item').click(function(e) {

        e.preventDefault();
        $that = $(this);
        $that.parent().find('.list-group-item.py-3').removeClass('open');
        $that.parent().find('.content').hide();
        
        $that.addClass('open');
        $that.find('.content').show();
    });


    $( "#input_amount_val" ).on('change',function() {

var input_val = parseFloat($(this).val()).toFixed(2); 
$(this).val(input_val);  
    });

    $( "#input_amount_val" ).on('keyup',function() {
        var max = parseInt($(this).attr('data-max'));
        var min = parseInt($(this).attr('data-min'));
        var input_val = parseFloat($(this).val()).toFixed(2); 
        $('#input_num_error').html('');
       $('#display_value').html('');
       $('#pp').hide();
         if(isNaN(input_val)=== false ){
        
        
            if($(this).val() > max){
                $('#input_num_error').html('Please enter valid amount in between '+ $('#range').text());   return false;
                //$(this).val(max); 
            }else if ($(this).val() < min){
                $('#input_num_error').html('Please enter valid amount in between '+$('#range').text());  return false;
               // $(this).val(min);                    
            }else{ 

                 // $(this).val(input_val);  
                  $('#pp').show();                   
            } 
            
            let input_val_final = $(this).val();
            let convenienceFee = parseFloat($('#convenienceFee_select').val());
            let exchangeRate = parseFloat($('#exchangeRate_select').val());
            let skuName = $('#skuName_select').val();
            let fee = parseFloat($('#fee_select').val());
            
             let skuId = $('#skuId_select').val();
            openDetails(input_val_final,skuName,convenienceFee,fee,exchangeRate,skuId); 
 
        }else{
            $('#input_num_error').html('Please enter valid input amount');   
        }                
    }); 

});

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
} 
 

$(document).ready(function(){
  $('#phonenew').keyup(function(){
      var min = $(this).attr('minlength');
      var max = $(this).attr('maxlength');
      if(min==max){
          $(this).attr('title','Mobile Number must be '+max+' digits');
      }else{
          $(this).attr('title','Mobile Number must be between '+min+' to '+max+' digits');
      }
  })
});
 
   
 var AllowOnlyAmountAndDot = function(e) {
      var t = e.value;
      e.value = parseFloat(e.value).toFixed(2);
  }
 
$(document).on('click','.dropdown-item',function(){     
     // alert('ready');   
        var cc = $(this).attr('data-prifixCodes');
        var imageUrl = $(this).attr('data-imageUrl');
        var countrycode = $(this).attr('data-countrycode');
        var currencyCode = $(this).attr('data-currencyCode');
        //customerwalletcurrencycode
         var  customerWalletCurrencyCode = JSON.parse(localStorage.getItem("customerWalletCurrencyCode")); 
         $('#phonenew').focus();
         $('#dropdown-menu').hide();
        if(cc!==undefined){
            $('#cc').val(cc); 
            $('#select_img_country').attr('src', imageUrl);
            $('#phonenew').val('');
            
            $('#country_code').val(cc);
            $('#country_iso').val(countrycode);
            $('#currency_code').val(currencyCode);
            $('#user_currency').val( customerWalletCurrencyCode );
            
            $('#operator_next_btn').hide();
            $('#title_phone').text('Mobile Number');
            //let countryCodeSelected = iti.getSelectedCountryData().iso2.toUpperCase()
            var detailsList = JSON.parse(localStorage.getItem("topup_data_countries"));     
            let result =detailsList.filter(activity => (activity.countryCode==countrycode));
            if(result[0].localLength!=undefined){
                $('#phonenew').attr('maxlength',result[0].localLength); //countrywise validation for input mobile number field
                $('#phonenew').attr('minlength',result[0].localLength);
            }   
            $('#phonenew').attr('placeholder','Enter Mobile Number');

        } 
    });
   
    
  
$(document).ready(function(){
  

   // Show hide popover
    $(".dropdown").click(function(){
        $(this).find(".dropdown-menu").slideToggle("fast");
    });



     
    $('#onkeydown').on('keydown',function(){ 
        resetMobileInput();
    });

    $('#phonenew').on('keydown',function(){ 
        resetMobileInput();
    });


    $('#phonenew').on('keyup',function(){ 
        resetMobileInput();
    });

    $('#phonenew').on('keypress',function(){ 
        resetMobileInput();
    });

});

function resetMobileInput(){
     if ( $('#phonenew').val().trim()) { 

        let mincal = parseInt( $('#phonenew').attr('minlength'));
        let maxcal = parseInt( $('#phonenew').attr('maxlength'))
        $('#operator_next_btn').hide();

        if( $('#phonenew').val().length >= mincal &&  $('#phonenew').val().length <= maxcal){      
            $('#check_operator').removeClass('disabled');
            $('#check_operator').attr('aria-disabled', false);
            $('#phonenew').removeClass('border-danger');
            $('#operator_next_btn').show();
            
        }else{             
            $('#phonenew').addClass("error"); 
            $('#phonenew').addClass('border-danger');
            $('#check_operator').addClass('disabled');
            $('#check_operator').attr('aria-disabled', true); 
            $('#operator_next_btn').hide();
           
            $('.operators_label').html('<i class="fa-solid fa-tower-broadcast"></i> Select Operator');
            $('#op_selectior').html('');
            $('.amount_label').html('<i class="fa fa-money-bill"></i> Amount');
            $('#elem2').hide();
            $('#elem').hide();
            $('.details').hide();
            $('#payment-element').html('');
            $('#button-text').hide();

        }  
 
      }
}
$(document).on("click", function(event){
    var $trigger = $(".dropdown"); 
    if($trigger !== event.target && event.target.id !== 'phonenew'  &&  !$trigger.has(event.target).length){
       $(".dropdown-menu").slideUp("fast");
    }    

});

$('#phonenew').on('click',function(){ 
   // if($('#cc').val().trim()==''){
    $('.dropdown-item').show();
        $('#dropdown-menu').show();

    //}
})

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("phonenew");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdown-menu");
  a = div.getElementsByTagName("a");

  // $('.focus').find('a').keydown(function(event) {
  //       if (event.which == 40)
  //           $(this).parent().next('li').addClass('active').children('a').focus();
  //   });
 

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

$(document).ready(function(){

    var contador = 0;
    

     $('#phonenew').keydown(function(e) {
       var resultado = $('#dropdown-menu > a:visible').length;
         
        if (e.keyCode == 13) {//enter 
            $('#dropdown-menu > a.active').trigger('click');
            $('#dropdown-menu > a.active').removeClass('active');
            $('#phonenew').focus();
            //$('#cc').val($('#dropdown-menu > a.active').attr('data-prifixcodes'));
        }

        if (e.keyCode == 40) { //down
             contador++; 
            if (contador > resultado) { 
              contador = 1;
            }
            
            // if (contador > resultado) { contador = 1; }
            $('#dropdown-menu > a.dropdown-item:visible').removeClass('active');      
            $('#dropdown-menu > a.dropdown-item:visible').eq(contador-1).addClass('active').scroll();


        }

        if (e.keyCode == 38) { //up
            contador--;  
            if (contador == 0) { contador = resultado; }
            $('#dropdown-menu > a.dropdown-item:visible').removeClass('active');      
            $('#dropdown-menu > a.dropdown-item:visible').eq(contador-1).addClass('active').scroll();

 
        }

        
    });


$("#phonenew").focus();
    $("#phonenew").focus( function() {
        var val = $("#phonenew").val();         
        if(val=='' ){    
           // $(".dropdown-menu").show(); 
        }
    });
 

     $("#phonenew").keyup(function(e){ 
        // console.log('keyup');
        var val = $("#phonenew").val();     
        if(val==''){
            // console.log(e.keyCode);
            if(e.keyCode==8){                
             $('#cc').val('');
             $('#select_img_country').attr('src', 'data:image/png;base64,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');
   
             $(".dropdown-menu").show();
            }else{
                  $(".dropdown-menu").hide();
            }
        }
        var cc = $('#cc').val().trim();
        

        if( cc==''){
            filterFunction();
        }else{
            $(".dropdown-menu").hide();
        }
     
    });

});

 
let elements; 
 
async function initialize(test) {
 var pe_key = $('#pe_key').val(); 
 const stripe = Stripe(pe_key);
 
// const { clientSecret } = await fetch(topup_plugin_homeurl+"/create.php", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ test }),
// }).then((r) => r.json());

 
 $.ajax({
        //async: true,
        url : Topup_Ajax_bject.ajax_url, 
        method : 'POST', 
        data: { 'action' : 'valuetopup_pay_stripe' ,'test' : test },
        success:function(response_data) {               
            var clientSecret = response_data.clientSecret;
            const appearance = {
              theme: 'stripe', 
              // labels: 'floating',
              variables: {
                fontFamily: 'Sohne, system-ui, sans-serif',
                fontWeightNormal: '500',
                borderRadius: '8px',
                colorBackground: '#F6F8FA',
                colorPrimary: 'black',
                colorPrimaryText: '#262626',
                colorText: 'black',
                colorTextSecondary: 'black',
                colorTextPlaceholder: 'white',
                colorIconTab: 'black',
                colorLogo: 'dark'
              },
              rules: {
                '.Input, .Block': {
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--colorPrimary)'
                }
              }   
            };

              elements = stripe.elements({ clientSecret ,appearance});
             const paymentElement = elements.create("payment",
              {
                fields: 
                  {
                    billingDetails: {country:'never',postalCode:'never'}
                  }
              });

              paymentElement.mount("#payment-element");
              paymentElement.on('loaderror', function(event) {
                // console.log(event);
                alert('Opps Somthing Went wrong Please try again ');
              });

               paymentElement.on('ready', function(event) {
                document
              .querySelector("#payment-form")
              .addEventListener("submit", handleSubmit);
                // alert('ready');
                $('#button-text').show();
                 $('#spinner').hide();

              }); 
               $('#payl').hide();

            // window.location.href =resp_data.url;
        } 
    })

 
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  // var return_url = window.location.origin+window.location.pathname+'/wp-content/plugins/topup/ss/return.php';
  var return_url =  topup_processing+'?processing=true';//+'/return.php';
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { 
      return_url: return_url,
    },
  });
 
  if (error.type === "card_error" || error.type === "validation_error") { 
    showMessage(error.message); 
  } else {
    // console.log(error.type)
    showMessage("An unexpected error occured.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

}
// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
    $('#spinner').show();
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
    $('#spinner').hide();
  }
}

$(document).ready(function(){

    var params = new window.URLSearchParams(window.location.search);
    var payment_intent = params.get('payment_intent');
    var msg = params.get('msg');
    var redirect_status = params.get('redirect_status');
    
    if(payment_intent){
    
        $.ajax({
            async: false,
            url : Topup_Ajax_bject.ajax_url, 
            method : 'POST', 
            data: { 'action' : 'get_process' , 'redirect_status':redirect_status, 'msg':msg,'payment_intent':payment_intent, },
            success:function(response_data) {  
                var resp_data = $.parseJSON(response_data); 
                window.location.href =resp_data.url;
            },
            beforeSend: function () {
              // $('body').html( '<center><h2> Please wait do not refresh while loading . . . </h2></center>' );
            },
        })


    }


})

 
  
