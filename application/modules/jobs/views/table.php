<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>
                DATA PEKERJAAN
            </h2>
        </div>
        <!-- Basic Examples -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" data-url="<?php echo base_url() ?>jobs/get" id="tabel-pekerjaan" data-loading-effect="timer" data-loading-color="lightBlue">
                                <thead>
                                    <tr>
                                        <th>Nama Pekerjaan</th>
                                        <th style="white-space:nowrap;width:1%;">Deskripsi</th>
                                        <th style="white-space:nowrap;width:1%;">Nominal</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- #END# Basic Examples -->
    </div>
</section>
<?php echo $footer; ?>