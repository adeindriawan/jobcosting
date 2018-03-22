<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>
                DATA ITEM
            </h2>
        </div>
        <div class="row clearfix">
            <div class="col-md-4">
                <h5>Sortir berdasarkan</h5>
            </div>
            <div class="col-md-4">
                <p>
                    <b>Jenis</b>
                </p>
                <select class="form-control show-tick" id="jenis" data-base-url="<?php echo base_url() ?>" data-url="<?php echo base_url() ?>items/filter">
                    <option value="">Jenis Item</option>
                    <option value="1">Bahan Baku</option>
                    <option value="2">Tenaga Kerja Langsung</option>
                    <option value="3">Overhead</option>
                </select>
            </div>
            <div class="col-md-4">
                <p>
                    <b>Satuan</b>
                </p>
                <select class="form-control show-tick" id="satuan" data-base-url="<?php echo base_url() ?>" data-url="<?php echo base_url() ?>items/filter">
                    <option value="">Satuan Item</option>
                    <option value="unit">unit</option>
                    <option value="pcs">pcs</option>
                    <option value="orang">orang</option>
                    <option value="m2">m2</option>
                </select>
            </div>
        </div>
        <!-- Basic Examples -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" data-url="<?php echo base_url() ?>items/get" id="tabel-item" data-loading-effect="timer" data-loading-color="lightBlue">
                                <thead>
                                    <tr>
                                        <th>Nama Item</th>
                                        <th style="white-space:nowrap;width:1%;">Jenis</th>
                                        <th style="white-space:nowrap;width:1%;">Harga</th>
                                        <th style="white-space:nowrap;width:1%;">Satuan</th>
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