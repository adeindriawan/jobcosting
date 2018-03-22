<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content" data-loading-effect="timer" data-loading-color="lightBlue">
    <div class="container-fluid">
        <div class="block-header">
            <h2>TAMBAH TRANSAKSI</h2>
        </div>

        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Form Penambahan Transaksi
                            <small>Harap isi semua bidang yang bertanda *</small>
                        </h2>
                        <ul class="header-dropdown m-r--5">
                            <li class="dropdown">
                                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <i class="material-icons">more_vert</i>
                                </a>
                                <ul class="dropdown-menu pull-right">
                                    <li><a href="javascript:void(0);">Action</a></li>
                                    <li><a href="javascript:void(0);">Another action</a></li>
                                    <li><a href="javascript:void(0);">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="body">
                        <h2 class="card-inside-title">Data Transaksi</h2>
                        <form id="form-tambah-transaksi">
	                        <div class="row clearfix">
	                            <div class="col-sm-6">
	                                <div class="form-group form-float">
	                                    <div class="form-line">
	                                        <input type="text" class="form-control" id="nama-transaksi" required>
	                                        <label class="form-label">Nama Transaksi*</label>
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="col-sm-6">
	                                <div class="input-group">
                                        <span class="input-group-addon">Rp</span>
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="nominal" id="nominal" placeholder="Nominal Transaksi* (tanpa titik dan desimal)" required>
                                        </div>
                                    </div>
	                            </div>
	                        </div>

	                        <h2 class="card-inside-title">Deskripsi Transaksi</h2>
	                        <textarea id="ckeditor" class="deskripsi-transaksi"></textarea><br>

	                        <div class="row clearfix">
	                        	<div class="form-group">
					                <select class="form-control show-tick" data-width="100%" data-live-search="true" name="jenis" mobile="true" id="jenis" required>
	                                    <option selected="" value="">Pilih jenis transaksi*</option>
	                                    <?php foreach ($jenis_transaksi as $value) { ?>
	                                    	<option id="option<?php echo $value['id'] ?>" value="<?php echo $value['id'] ?>"><?php echo $value['jenis'] ?></option>
	                                    <?php } ?>
	                                </select>
					            </div>
	                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- #END# Input -->

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="button-demo">
                    <button type="button" id="tombol-tambah-transaksi" data-url="<?php echo base_url() ?>transactions/add" class="btn btn-primary waves-effect">SIMPAN</button>
                    <button type="button" class="btn btn-danger waves-effect">BATAL</button>
                </div>
            </div>
        </div>
    </div>
</section>
<?php echo $footer; ?>