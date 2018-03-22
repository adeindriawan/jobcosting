<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content" data-loading-effect="timer" data-loading-color="lightBlue">
    <div class="container-fluid">
        <div class="block-header">
            <h2>TAMBAH ITEM</h2>
        </div>

        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Form Penambahan Item
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
                        <h2 class="card-inside-title">Data Item</h2>
                        <form id="form-tambah-item">
	                        <div class="row clearfix">
	                            <div class="col-sm-6">
	                                <div class="form-group form-float">
	                                    <div class="form-line">
	                                        <input type="text" class="form-control" id="nama-item" required>
	                                        <label class="form-label">Nama Item*</label>
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="col-sm-6">
	                                <div class="input-group">
                                        <span class="input-group-addon">Rp</span>
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="harga" id="harga-item" placeholder="Harga Item* (tanpa titik dan desimal)" required>
                                        </div>
                                    </div>
	                            </div>
	                        </div>

	                        <div class="row clearfix">
	                            <div class="col-md-6">
	                                <div class="form-group">
						                <label for="name">Jenis Item</label>
						                <select class="form-control show-tick" name="jenis" id="jenis-item" required>
		                                    <option selected="" value="">Pilih jenis item</option>
		                                    <option value="1">Bahan Baku</option>
		                                    <option value="2">Tenaga Kerja Langsung</option>
		                                    <option value="3">Overhead</option>
		                                </select>
						            </div>
	                            </div>
	                            <div class="col-md-6">
	                                <div class="form-group">
						                <label for="name">Satuan Item</label>
						                <select class="form-control show-tick" name="satuan" id="satuan-item" required>
		                                    <option selected="" value="">Pilih satuan item</option>
		                                    <option value="unit">unit</option>
		                                    <option value="pcs">pcs</option>
		                                    <option value="orang">orang</option>
		                                    <option value="m2">m2</option>
		                                </select>
						            </div>
	                            </div>
	                        </div>

	                        <div class="row clearfix">
	                        	<div class="col-md-8">
	                                 <div class="form-group">
						                <label for="name">Akun Item</label>
						                <select class="form-control show-tick" name="akun" data-live-search="true" id="akun-item" required>
		                                    <option selected="" value="">Pilih akun item</option>
		                                </select>
						            </div>
	                            </div>
	                        </div>

	                        <h2 class="card-inside-title">Deskripsi Item</h2>
	                        <textarea id="ckeditor" class="deskripsi-item"></textarea>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- #END# Input -->

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="button-demo">
                    <button type="button" id="tombol-tambah-item" data-url="<?php echo base_url() ?>items/add" class="btn btn-primary waves-effect">SIMPAN</button>
                    <button type="button" class="btn btn-danger waves-effect">BATAL</button>
                </div>
            </div>
        </div>
    </div>
</section>
<?php echo $footer; ?>