<?php echo $head; ?>
<?php echo $nav; ?>
<?php echo $menu; ?>
<section class="content" data-loading-effect="timer" data-loading-color="lightBlue">
    <div class="container-fluid">
        <div class="block-header">
            <h2>TAMBAH JENIS TRANSAKSI</h2>
        </div>

        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Form Penambahan Jenis Transaksi
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
                        <h2 class="card-inside-title">Data Jenis Transaksi</h2>
                        <form id="form-tambah-jenis-transaksi">
	                        <div class="row clearfix">
	                            <div class="col-sm-6">
	                                <div class="form-group form-float">
	                                    <div class="form-line">
	                                        <input type="text" class="form-control" name="nama" id="nama-jenis-transaksi" required>
	                                        <label class="form-label">Nama Jenis Transaksi*</label>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>

	                        <h2 class="card-inside-title">Deskripsi Jenis Transaksi</h2>
	                        <textarea id="ckeditor" class="deskripsi-jenis-transaksi"></textarea><br>

                            <div class="body table-responsive">
                                <table class="table">
                                    <tr>
                                        <th style="width:500px;">Akun</th>
                                        <th>Sisi</th>
                                        <th>Hapus</th>
                                    </tr>
                                    <tr class="data-wrapper row1">
                                        <td>
                                            <div class="form-group">
                                                <select class="form-control show-tick daftar-akun daftar1" id="akun" data-width="100%" data-live-search="true" urut="1" name="akun[]" mobile="true" required>
                                                    <option selected="" value="">Pilih akun*</option>
                                                    <?php foreach ($akun as $value) { ?>
                                                        <option id="option<?php echo $value['id'] ?>" value="<?php echo $value['id'] ?>"><?php echo $value['nama'] ?></option>
                                                    <?php } ?>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group">
                                                <select class="form-control show-tick sisi-akun sisi1" id="sisi" data-width="100%" data-live-search="true" urut="1" name="sisi[]" mobile="true" required>
                                                    <option value="">Pilih sisi akun*</option>
                                                    <option value="1">Debet</option>
                                                    <option value="2">Kredit</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-xs hapus-baris" value="1" style="margin-top:5px;">Hapus</button>
                                        </td>
                                    </tr>
                                </table>
                                <button type="button" class="btn btn-info btn-xs" style="margin-top:5px;" id="tambah-akun">Tambah Akun</button>
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
                    <button type="button" id="tombol-tambah-jenis-transaksi" data-url="<?php echo base_url() ?>transactions/add-group" class="btn btn-primary waves-effect">SIMPAN</button>
                    <button type="button" class="btn btn-danger waves-effect">BATAL</button>
                </div>
            </div>
        </div>
    </div>
</section>
<?php echo $footer; ?>