$(function () {
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
    }

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
});