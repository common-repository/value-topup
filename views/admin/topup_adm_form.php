<?php
 
if($_POST){ 
   topupPlugSetConfig(sanitize_text_field($_POST['username']), sanitize_text_field($_POST['password']));
} 

$config = topupPlugGetConfig(); 
$transactions = topupPlugGetTransactions(); 

?>

<div id="wpbody" role="main">
    <div id="wpbody-content">
        <div class="wrap">
            <h1>ValueTopUp Settings</h1>

            <form method="post" action="?page=topup-plugin" novalidate="novalidate">           
         
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="username">Username</label></th>
                            <td><input name="username" type="text" id="username" placeholder="Enter Your API Username" value="<?php echo esc_html_e($config[0]['username']) ?? ''?>" class="regular-text">
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="password">Password</label></th>
                            <td><input name="password" type="text" id="password" placeholder="Enter Your API Password" value="<?php echo esc_html_e($config[0]['password']) ?? ''?>" class="regular-text">
                            </td>
                        </tr>
 
                       
                    </tbody>
                </table>
                <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>
            </form>
            
            <hr>

           <center> <h3> Transactions Log </h3></center>
            <table class="wp-list-table widefat fixed striped table-view-list" role="presentation">
                <thead>
                    <tr>
                        <td>Url</td>
                        <td>req</td>
                        <td>resp</td>
                        <td>time</td>
                    </tr>
                </thead>
                <?php foreach( $transactions as $tr){ ?>
                    <tbody>
                        <tr>
                            <td><?php echo esc_html_e($tr['url']) ?? ''; ?></td>
                            <td><?php echo esc_html_e($tr['req']) ?? ''; ?></td>
                            <td><?php echo esc_html_e($tr['resp']) ?? ''; ?></td>
                            <td><?php echo esc_html_e($tr['added_on']) ?? ''; ?></td>
                        </tr>
                    </tbody>
                <?php } ?>
                 <tfoot>
                    <tr>
                        <td>Url</td>
                        <td>req</td>
                        <td>resp</td>
                        <td>time</td>
                    </tr>
                </tfoot>
            </table>



        </div>


        <div class="clear"></div>
    </div><!-- wpbody-content -->
    <div class="clear"></div>
</div>

 
 