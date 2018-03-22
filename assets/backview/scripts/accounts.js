$(function () {
    //CKEditor
    if ($('textarea#ckeditor').length) {
    	CKEDITOR.replace('ckeditor');
    	CKEDITOR.config.height = 300;
    };

    if ($('#form-tambah-akun').length) {
        $('#form-tambah-akun').validate({
            ignore: [], // karena menggunakan bootstrap-select
            rules: {
                nama: {
                    required: true
                },
                akun: {
                    required: true
                }
            }
        });
    };

    $('#akun-induk').selectpicker({
        dropupAuto: false
    });
});

$('#tombol-tambah-akun').click(function(event) {
    /* Act on the event */
    var nama = $('#nama-akun').val();
    var deskripsi = CKEDITOR.instances['ckeditor'].getData();
    var akun = $('#akun-induk').val();
    var url = $(this).attr('data-url');

    if ($('#form-tambah-akun').valid()) {
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
            if (response == 'false') {
                $('.content').waitMe('hide');

                swal({
                    icon: "error",
                    text: "Data terkirim namun tidak tersimpan dalam sistem.",
                });
            } else {
                $('.content').waitMe('hide');

                swal({
                    icon: "success",
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
                akun: akun,
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

    $('#nama-akun').val('');
    var deskripsi = CKEDITOR.instances['ckeditor'].setData('');
    $('#akun-induk').val('default');
    $('#akun-induk').selectpicker('refresh');
});