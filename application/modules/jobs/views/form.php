<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content" data-loading-effect="timer" data-loading-color="lightBlue">
    <div class="container-fluid">
        <div class="block-header">
            <h2>TAMBAH PEKERJAAN</h2>
        </div>

        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Form Penambahan Pekerjaan
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
                        <h2 class="card-inside-title">Data Pekerjaan</h2>
                        <form id="form-tambah-pekerjaan">
	                        <div class="row clearfix">
	                            <div class="col-sm-6">
	                                <div class="form-group form-float">
	                                    <div class="form-line">
	                                        <input type="text" class="form-control" id="nama-pekerjaan" required>
	                                        <label class="form-label">Nama Pekerjaan*</label>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>

	                        <h2 class="card-inside-title">Deskripsi Pekerjaan</h2>
	                        <textarea id="ckeditor" class="deskripsi-pekerjaan"></textarea>

	                        <div class="body table-responsive">
	                            <table class="table">
	                                <tr>
										<th style="width:500px;">Item | Satuan</th>
										<th>Qty</th>
										<th>Subtotal</th>
										<th>Hapus</th>
									</tr>
									<tr class="data-wrapper row1">
										<td>
											<div class="form-group">
								                <select class="form-control show-tick daftar-item daftar1" data-width="100%" data-live-search="true" urut="1" name="item[]" mobile="true" id="item" required>
				                                    <option selected="" value="">Pilih item</option>
				                                    
				                                </select>
								            </div>
										</td>
										<td>
											<div class="form-group">
			                                    <input type="number" style="width:50px;" name="qty[]" step="0.01" urut="1" class="qty-item qty1" required>
			                                </div>
										</td>
										<td>
											<span class="subtotal-item subtotal1" urut="1"></span>
										</td>
										<td>
											<button type="button" class="btn btn-danger btn-xs hapus-baris" value="1" style="margin-top:5px;">Hapus</button>
										</td>
									</tr>
	                            </table>
	                            <button type="button" class="btn btn-info btn-xs" style="margin-top:5px;" id="tambah-item">Tambah Item</button>
	                        </div>

                        	<div class="row clearfix">
	                            <div class="col-sm-6">
	                                <label class="form-label">Total Anggaran Pekerjaan: Rp</label>
	                                <span id="total"></span>
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
                    <button type="button" id="tombol-tambah-pekerjaan" data-url="<?php echo base_url() ?>jobs/add" class="btn btn-primary waves-effect">SIMPAN</button>
                    <button type="button" class="btn btn-danger waves-effect">BATAL</button>
                </div>
            </div>
        </div>
    </div>
</section>
<?php echo $footer; ?>