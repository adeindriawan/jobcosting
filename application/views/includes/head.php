<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title><?php echo $title ?></title>
        <!-- Favicon-->
        <link rel="icon" href="<?php echo base_url() ?>assets/backview/favicon.ico" type="image/x-icon">

        <!-- Google Fonts -->
        <link href="<?php echo base_url() ?>assets/backview/css/roboto.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/backview/css/material-icons.css" rel="stylesheet" type="text/css">

        <!-- Styles from controller -->
        <?php foreach ($styles as $key => $value) { ?>
            <link href="<?php echo base_url() . $value ?>" rel="stylesheet">
        <?php } ?>
    </head>

    <body class="theme-red" data-base-url="<?php echo base_url() ?>">