$(function () {
    //CKEditor
    if ($('textarea#ckeditor').length) {
    	CKEDITOR.replace('ckeditor');
    	CKEDITOR.config.height = 300;
    };

    if ($('#form-tambah-proyek').length) {
        $('#form-tambah-proyek').validate({
            ignore: [], // karena menggunakan bootstrap-select
            rules: {
                nilai: {
                        required: true,
                        number: true
                    }
                }
        });

        $('.daftar-pekerjaan').selectpicker({
            dropupAuto: false
        });
    };
});

var counter = 1;
var idx = 1; // bikin variable baru, idx, nilainya sama dengan counter tapi tidak berkurang ketika ada pengurangan elemen
var clone = $("table tr.data-wrapper:first").clone(true);

$('#tambah-pekerjaan').click(function(event) {
    /* Act on the event */

    var ParentRow = $("table tr.data-wrapper").last();
    counter++;
    idx++;
    clone.clone(true).insertAfter(ParentRow);
    $('tr.data-wrapper:last').removeClass('row1');
    $('tr.data-wrapper:last').addClass('row' + idx);
    $('tr.data-wrapper:last select').attr({
        'urut': idx,
        'class': 'daftar' + idx
    });
    $('tr.data-wrapper:last select').addClass('daftar-pekerjaan');
    $('tr.data-wrapper:last td span.subtotal-pekerjaan').attr({
        'urut': idx,
        'class': 'subtotal' + idx
    });
    $('tr.data-wrapper:last td span').addClass('subtotal-pekerjaan');
    $('tr.data-wrapper:last input').attr({
        'urut': idx,
        'class': 'qty' + idx
    });
    $('tr.data-wrapper:last input').addClass('qty-pekerjaan');
    $('tr.data-wrapper:last button').attr('value', idx);
    $('tr.data-wrapper:last select').selectpicker();

    $('.daftar-pekerjaan').change(function(event) { // this is for cloned elements
        /* Act on the event */
        var id = $(this).find('option:selected').val();
        var harga = $(this).find('option:selected').attr('harga');
        var urut = $(this).attr('urut');
        $('.qty'+urut).val('1');
        $('.subtotal'+urut).text(harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

        // menghilangkan separator '.' ribuan pada subtotal agar dapat dikonversi ke integer
        var subt = $('.subtotal-pekerjaan').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    });

    $('.qty-pekerjaan').change(function(event) {
        /* Act on the event */
        var urut = $(this).attr('urut');
        var qty = $(this).val();
        var harga = $('.daftar' + urut).find('option:selected').attr('harga');
        var subtotal = parseFloat(qty) * parseInt(harga);
        var sub = Math.round((subtotal * 100)/100);

        $('.subtotal' + urut).text(sub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")); // untuk menjadikan format kurs

        var subt = $('.subtotal-pekerjaan').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    });
});

$('.daftar-pekerjaan').change(function(event) { // this is for original element
    /* Act on the event */
    var id = $(this).find('option:selected').val();
    var harga = $(this).find('option:selected').attr('harga');
    var urut = $(this).attr('urut');
    $('.qty'+urut).val('1');
    $('.subtotal'+urut).text(harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

    var total = $('.subtotal'+urut).text();

    $('#total').text(total);
});

$('.qty-pekerjaan').change(function(event) {
    /* Act on the event */
    var urut = $(this).attr('urut');
    var qty = $(this).val();
    var harga = $('.daftar' + urut).find('option:selected').attr('harga');
    var subtotal = parseFloat(qty) * parseInt(harga);
    var sub = Math.round((subtotal * 100)/100);

    $('.subtotal' + urut).text(sub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

    var total = $('.subtotal'+urut).text();

    $('#total').text(total);
});

$('body').on('click', '.hapus-baris', function(event) {
    event.preventDefault();
    /* Act on the event */

    if (counter == 1) {
        alert('Tidak ada lagi pekerjaan yang bisa dihapus. Harus ada minimum 1 pekerjaan di setiap proyek!');
        return false;
    } else {
        $(this).parents('tr').remove();

        var subt = $('.subtotal-pekerjaan').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        counter = counter - 1; // sebagai pengganti counter--; karena ada bug di jQuery
        
        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        console.log("counter: " + counter);
    }
});

$('#tombol-tambah-proyek').click(function(event) {
    /* Act on the event */
    var nama = $('#nama-proyek').val();
    var deskripsi = CKEDITOR.instances['ckeditor'].getData();
    var total = $('#total').text().toString().replace(/[^0-9]+/g,"");
    var nilai = $('#nilai-proyek').val();
    var url = $(this).attr('data-url');

    var daftar = $('.daftar-pekerjaan option:selected').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Pekerjaan tidak boleh kosong!');
        } else {
            return $(this).val();
        }
    }).get();
    var qty = $('.qty-pekerjaan').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Qty tidak boleh kosong');
        } else {
            return $(this).val();
        }
    }).get();
    var subtotal = $('.subtotal-pekerjaan').map(function() {
        return $(this).text().toString().replace(/[^0-9]+/g,"");
    })

    if (daftar.length != qty.length) {
        alert('Jumlah pekerjaan dan nilai Qty tidak cocok!');
    }

    var job = [];
    $.each(daftar, function(i, v) {
        /* iterate through array or object */
        job[i] = [v, qty[i], subtotal[i]];
    });

    if ($('#form-tambah-proyek').valid()) {
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
                total: total,
                nilai: nilai,
                job: job
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

    $('#nama-proyek').val('');
    var deskripsi = CKEDITOR.instances['ckeditor'].setData('');
    $('#nilai-proyek').val('');
    $('.daftar-pekerjaan').val('default');
    $('.daftar-pekerjaan').selectpicker('refresh');
    $('.qty-pekerjaan').val('');
    $('.subtotal-pekerjaan').text('');
    $('#total').text('');
});