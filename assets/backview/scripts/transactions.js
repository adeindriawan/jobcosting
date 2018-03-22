$(function () {
    var base_url = $('body').data('base-url');

    //CKEditor
    if ($('textarea#ckeditor').length) {
    	CKEDITOR.replace('ckeditor');
    	CKEDITOR.config.height = 300;
    };

    if ($('#form-tambah-transaksi').length) {
        $('#form-tambah-transaksi').validate({
            ignore: [], // karena menggunakan bootstrap-select
            rules: {
                nominal: {
                        required: true,
                        number: true
                    }
                }
        });

        $.get(base_url + 'transactions/transaction-categories', function(data, status) {
            /*optional stuff to do after success */
            if (status == 'success') {
                var response = $.parseJSON(data);
                var response_status = response['status'];
                var response_data = response['data'];
                if (response_status == 'success') {
                    var options = '';
                    var iter = 0;
                    $.each(response_data, function(i, v) {
                        /* iterate through array or object */
                        options += '<option id="option'+ v.id +'" value="'+ v.id +'">'+ v.jenis +'</option>';
                        iter++;
                        if (response_data.length == iter) {
                            $('#jenis').append(options);
                            $('#jenis').selectpicker('refresh');
                        };
                    });
                } else {
                    alert('Terjadi error ketika mengambil data jenis transaksi! Kode: 02');
                };
            } else {
                alert('Terjadi error ketika mengambil data jenis transaksi! Kode: 01');
            };
        });
    };

    if ($('#form-tambah-jenis-transaksi').length) {
        $('#form-tambah-jenis-transaksi').validate({
            ignore: [], // karena menggunakan bootstrap-select
            rules: {
                nama: {
                    required: true
                },
                akun: {
                    required: true
                },
                sisi: {
                    required: true
                }
            }
        });

        $('.daftar-akun').selectpicker({
            dropupAuto: false
        });
        $('.sisi-akun').selectpicker({
            dropupAuto: false
        });
    };
});

var counter = 1;
var idx = 1; // bikin variable baru, idx, nilainya sama dengan counter tapi tidak berkurang ketika ada pengurangan elemen
var clone = $("table tr.data-wrapper:first").clone(true);

$('#tambah-akun').click(function(event) {
    /* Act on the event */
    var ParentRow = $("table tr.data-wrapper").last();
    counter++;
    idx++;
    clone.clone(true).insertAfter(ParentRow);
    $('tr.data-wrapper:last').removeClass('row1');
    $('tr.data-wrapper:last').addClass('row' + idx);
    $('tr.data-wrapper:last #akun').attr({
        'urut': idx,
        'class': 'daftar' + idx
    });
    $('tr.data-wrapper:last #akun').addClass('daftar-akun');
    $('tr.data-wrapper:last #sisi').attr({
        'urut': idx,
        'class': 'sisi' + idx
    });
    $('tr.data-wrapper:last #sisi').addClass('sisi-akun');
    $('tr.data-wrapper:last button').attr('value', idx);
    $('tr.data-wrapper:last select').selectpicker({
        dropupAuto: false
    });
});

$('body').on('click', '.hapus-baris', function(event) {
    event.preventDefault();
    /* Act on the event */

    if (counter <= 2) {
        alert('Tidak ada lagi akun yang bisa dihapus. Harus ada minimum 2 akun (debet&kredit) di setiap jenis transaksi!');
        return false;
    } else {
        $(this).parents('tr').remove();

        counter = counter - 1; // sebagai pengganti counter--; karena ada bug di jQuery
        console.log("counter: " + counter);
    }
});

$('#tombol-tambah-jenis-transaksi').click(function(event) {
    /* Act on the event */
    var nama = $('#nama-jenis-transaksi').val();
    var deskripsi = CKEDITOR.instances['ckeditor'].getData();
    var url = $(this).attr('data-url');

    var akun = $('.daftar-akun option:selected').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Akun tidak boleh kosong!');
        } else {
            return $(this).val();
        }
    }).get();
    var sisi = $('.sisi-akun option:selected').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Sisi tidak boleh kosong');
        } else {
            return $(this).val();
        }
    }).get();

    if (akun.length != sisi.length) {
        alert('Jumlah akun dan jumlah sisi tidak cocok!');
    } else {
        var jrn = [];
        $.each(akun, function(i, v) {
            /* iterate through array or object */
            jrn[i] = [v, sisi[i]];
        });

        if ($('#form-tambah-jenis-transaksi').valid()) {
            beforeSend = function() {
                var effect = $('.content').data('loadingEffect');
                var color = $.AdminBSB.options.colors[$('.content').data('loadingColor')];

                var $loading = $('.content').waitMe({
                    effect: effect,
                    text: 'Loading...',
                    bg: 'rgba(255,255,255,0.90)',
                    color: color
                });
            };
            success = function(response) {
                if (response == 'true') {
                    $('.content').waitMe('hide');

                    swal({
                        icon: "success",
                    });
                } else {
                    $('.content').waitMe('hide');

                    swal({
                        icon: "error",
                        text: "Data terkirim namun tidak tersimpan dalam sistem.",
                    });
                };
            };
            error = function() {
                $('.content').waitMe('hide');

                swal({
                    icon: "error",
                    text: "Data tidak dapat terkirim.",
                });
            };

            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    nama: nama,
                    deskripsi: deskripsi,
                    jurnal: jrn
                },
                beforeSend: beforeSend,
                success: success,
                error: error
            });
        } else {
            swal({
                icon: 'error',
                text: 'Semua isian yang wajib harus terisi.'
            })
        };

        $('#nama-jenis-transaksi').val('');
        var deskripsi = CKEDITOR.instances['ckeditor'].setData('');
        $('.daftar-akun').val('default');
        $('.daftar-akun').selectpicker('refresh');
        $('.sisi-akun').val('default');
        $('.sisi-akun').selectpicker('refresh');
    }
});

$('#jenis').change(function(event) {
    var base_url = $('body').data('base-url');
    var trx_category = $(this).val();
    /* Act on the event */
    $.get(base_url + 'transactions/accounts-of-a-transaction-category/' + trx_category, function(data, status) {
        /*optional stuff to do after success */
        if (status == 'success') {
            var response = $.parseJSON(data);
            var response_status = response['status'];
            var response_data = response['data'];
            if (response_status == 'success') {
                var form = '<div class="row clearfix"><blockquote>'+ response_data[0].deskripsi +'</blockquote></div>';
                var iter = 0;
                $.each(response_data, function(i, v) {
                    var sisi_akun = (v.sisi_akun == '1') ? 'DEBET' : 'KREDIT';
                    /* iterate through array or object */
                    form += '<div class="row clearfix">';
                    form += '<div class="col-sm-4">'+ v.nama +'</div>';
                    form += '<div class="col-sm-4">'+ sisi_akun +'</div>';
                    form += '<div class="col-sm-4"><div class="input-group"><span class="input-group-addon">Rp</span><div class="form-line"><input type="text" placeholder="Nominal" class="form-control input-akun" data-sisi="'+v.sisi_akun+'"></div></div></div></div>';
                    iter++;
                    if (response_data.length == iter) {
                        form += '<button type="button" class="btn btn-primary btn-xs" style="margin-top:5px;" id="check" data-toggle="cardloading" data-loading-effect="timer" data-loading-color="lightBlue">Cek</button>';
                        $('#input').html(form);
                    };
                });
            } else {
                alert('Terjadi error ketika mengambil data akun pada jenis transaksi ini! Kode: 02');
            };
        } else {
            alert('Terjadi error ketika mengambil data akun pada jenis transaksi ini! Kode: 01');
        };
    });
});

$('body').on('click', '#check', function(event) {
    /* Act on the event */
    var total_debet = $('.input-akun').map(function(i, e) {
        if ($(this).data('sisi') == '1') {
            return parseInt($(this).val());
        };
    }).get();

    var total_kredit = $('.input-akun').map(function(i, e) {
        if ($(this).data('sisi') == '2') {
            return parseInt($(this).val());
        };
    }).get();

    console.log('Dr: ' + total_debet);
    console.log('Cr: ' + total_kredit);
});