$(function () {
    var base_url = $('body').data('base-url');

    //CKEditor
    if ($('textarea#ckeditor').length) {
    	CKEDITOR.replace('ckeditor');
    	CKEDITOR.config.height = 300;
    };

    if ($('#form-tambah-pekerjaan').length) {
        $('#form-tambah-pekerjaan').validate({
            ignore: [] // karena menggunakan bootstrap-select
        });

        function getMaterials() {
            return $.get(base_url + 'jobs/materials', function(data, status) {
                /*optional stuff to do after success */
                if (status == 'success') {
                    var response = $.parseJSON(data);
                    var response_status = response['status'];
                    var response_data = response['data'];
                    if (response_status == 'success') {
                        var options = '<optgroup label="Bahan Baku">';
                        var iter = 0;
                        $.each(response_data, function(i, v) {
                            /* iterate through array or object */
                            options += '<option id="option'+ v.id +'" value="'+ v.id +'" harga="'+ v.harga +'">'+ v.nama + ' || ' + v.satuan +'</option>';
                            iter++;
                        });
                        if (response_data.length == iter) {
                            options += '</optgroup>';
                            $('#item').append(options);
                        };
                    } else{
                        alert('Terjadi error ketika mengambil data item! Kode: 02');
                    };
                } else{
                    alert('Terjadi error ketika mengambil data item! Kode: 01');
                };
            }); 
        }

        function getLabors() {
            return $.get(base_url + 'jobs/labors', function(data, status) {
                /*optional stuff to do after success */
                if (status == 'success') {
                    var response = $.parseJSON(data);
                    var response_status = response['status'];
                    var response_data = response['data'];
                    if (response_status == 'success') {
                        var options = '<optgroup label="Tenaga Kerja Langsung">';
                        var iter = 0;
                        $.each(response_data, function(i, v) {
                            /* iterate through array or object */
                            options += '<option id="option'+ v.id +'" value="'+ v.id +'" harga="'+ v.harga +'">'+ v.nama + ' || ' + v.satuan +'</option>';
                            iter++;
                        });
                        if (response_data.length == iter) {
                            options += '</optgroup>';
                            $('#item').append(options);
                        };
                    } else{
                        alert('Terjadi error ketika mengambil data item! Kode: 02');
                    };
                } else{
                    alert('Terjadi error ketika mengambil data item! Kode: 01');
                };
            });
        }

        function getOverheads() {
            return $.get(base_url + 'jobs/overheads', function(data, status) {
                /*optional stuff to do after success */
                if (status == 'success') {
                    var response = $.parseJSON(data);
                    var response_status = response['status'];
                    var response_data = response['data'];
                    if (response_status == 'success') {
                        var options = '<optgroup label="Overhead">';
                        var iter = 0;
                        $.each(response_data, function(i, v) {
                            /* iterate through array or object */
                            options += '<option id="option'+ v.id +'" value="'+ v.id +'" harga="'+ v.harga +'">'+ v.nama + ' || ' + v.satuan +'</option>';
                            iter++;
                        });
                        if (response_data.length == iter) {
                            options += '</optgroup>';
                            $('#item').append(options);
                        };
                    } else{
                        alert('Terjadi error ketika mengambil data item! Kode: 02');
                    };
                } else{
                    alert('Terjadi error ketika mengambil data item! Kode: 01');
                };
            }); 
        }

        $.when(getMaterials(), getLabors(), getOverheads()).done(function() {
            $('#item').selectpicker('refresh');
        });
        

        $('.daftar-item').selectpicker({
            dropupAuto: false
        });
    };

    if ($('#tabel-pekerjaan').length) {
        var url = $('#tabel-pekerjaan').attr('data-url');

        var tabel = $('#tabel-pekerjaan').DataTable({
            dom: 'lfrtip',
            processing: true,
            serverSide: true,
            lengthChange: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
            ajax: {
                'url': url,
                'dataSrc': function(json) {
                    var return_data = new Array();
                    for(var i=0;i< json['data'].length; i++) {

                        var btn_detail = '<button type="button" value="'+ json['data'][i].id +'" data-name="'+ json['data'][i].nama +'" data-price="'+ json['data'][i].nominal +'" data-description="'+ json['data'][i].deskripsi +'" class="btn btn-primary btn-circle waves-effect waves-circle waves-float btn-detail" data-toggle="tooltip" data-placement="top" title="Detail Job"><i class="material-icons">zoom_in</i></button>';
                        var btn_edit = '<button type="button" value="'+ json['data'][i].id +'" class="btn btn-info btn-circle waves-effect waves-circle waves-float btn-edit" data-toggle="tooltip" data-placement="top" title="Edit Job"><i class="material-icons">mode_edit</i></button>';
                        var btn_delete = '<button type="button" value="'+ json['data'][i].id +'" class="btn btn-danger btn-circle waves-effect waves-circle waves-float btn-delete" data-toggle="tooltip" data-placement="top" title="Hapus Job"><i class="material-icons">delete</i></button>';
                        var btn_actions = btn_detail + btn_edit + btn_delete;
                        var nominal = 'Rp' + json['data'][i].nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        
                        return_data.push({
                          'nama': json['data'][i].nama,
                          'deskripsi': json['data'][i].deskripsi,
                          'nominal': nominal,
                          'actions': btn_actions
                        });
                    }

                    return return_data;
                },
            },
            columns: [
                {'data': 'nama'},
                {'data': 'deskripsi'},
                {'data': 'nominal'},
                {'data': 'actions'}
            ],
            responsive: true,
            initComplete: function() {
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
                $('.btn-detail').click(function(event) { // callback dipanggil di sini
                    var id = $(this).val();
                    var name = $(this).data('name');
                    var price = $(this).data('nominal');
                    var description = $(this).data('description');
                    var account = $(this).data('account');

                    btnDetailClick(id, name, category, price, unit, description, account);
                });
                $('.btn-edit').click(function(event) {
                    /* Act on the event */
                    var id = $(this).val();
                    btnEditClick(id);
                });
                $('.btn-delete').click(function(event) {
                    /* Act on the event */
                    var id = $(this).val();
                    btnDeleteClick(id, tabel);
                });
            },
            drawCallback: function() {
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
                $('.btn-detail').click(function(event) { // callback dipanggil di sini
                    var id = $(this).val();
                    var name = $(this).data('name');
                    var price = $(this).data('nominal');
                    var description = $(this).data('description');
                    var account = $(this).data('account');

                    btnDetailClick(id, name, category, price, unit, description, account);
                });
                $('.btn-edit').click(function(event) {
                    /* Act on the event */
                    var id = $(this).val();
                    var source_id = $(this).data('source-id');
                    btnEditClick(id, source_id);
                });
                $('.btn-delete').click(function(event) {
                    /* Act on the event */
                    var id = $(this).val();
                    var source_id = $(this).data('source-id');
                    btnDeleteClick(id, source_id, table);
                });
            }
        });
    };
});

var counter = 1;
var idx = 1; // bikin variable baru, idx, nilainya sama dengan counter tapi tidak berkurang ketika ada pengurangan elemen
var clone = $("table tr.data-wrapper:first").clone(true);

$('#tambah-item').click(function(event) {
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
    $('tr.data-wrapper:last select').addClass('daftar-item');
    $('tr.data-wrapper:last td span.subtotal-item').attr({
        'urut': idx,
        'class': 'subtotal' + idx
    });
    $('tr.data-wrapper:last td span').addClass('subtotal-item');
    $('tr.data-wrapper:last input').attr({
        'urut': idx,
        'class': 'qty' + idx
    });
    $('tr.data-wrapper:last input').addClass('qty-item');
    $('tr.data-wrapper:last button').attr('value', idx);
    $('tr.data-wrapper:last select').selectpicker();

    $('.daftar-item').change(function(event) { // this is for cloned elements
        /* Act on the event */
        var id = $(this).find('option:selected').val();
        var harga = $(this).find('option:selected').attr('harga');
        var urut = $(this).attr('urut');
        $('.qty'+urut).val('1');
        $('.subtotal'+urut).text(harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

        // menghilangkan separator '.' ribuan pada subtotal agar dapat dikonversi ke integer
        var subt = $('.subtotal-item').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    });

    $('.qty-item').change(function(event) {
        /* Act on the event */
        var urut = $(this).attr('urut');
        var qty = $(this).val();
        var harga = $('.daftar' + urut).find('option:selected').attr('harga');
        var subtotal = parseFloat(qty) * parseInt(harga);
        var sub = Math.round((subtotal * 100)/100);

        $('.subtotal' + urut).text(sub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")); // untuk menjadikan format kurs

        var subt = $('.subtotal-item').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    });
});

$('.daftar-item').change(function(event) { // this is for original element
    /* Act on the event */
    var id = $(this).find('option:selected').val();
    var harga = $(this).find('option:selected').attr('harga');
    var urut = $(this).attr('urut');
    $('.qty'+urut).val('1');
    $('.subtotal'+urut).text(harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

    var total = $('.subtotal'+urut).text();

    $('#total').text(total);
});

$('.qty-item').change(function(event) {
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
        alert('Tidak ada lagi item yang bisa dihapus. Harus ada minimum 1 item di setiap pekerjaan!');
        return false;
    } else {
        $(this).parents('tr').remove();

        var subt = $('.subtotal-item').map(function(i, e) {
            return parseInt($(this).text().toString().replace(/[^0-9]+/g,""));
        }).get();

        counter = counter - 1; // sebagai pengganti counter--; karena ada bug di jQuery
        
        var tot = subt.reduce(function(a, b){return parseInt(a)+parseInt(b);}, 0);
        $('#total').text(tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        console.log("counter: " + counter);
    }
});

$('#tombol-tambah-pekerjaan').click(function(event) {
    /* Act on the event */
    var nama = $('#nama-pekerjaan').val();
    var deskripsi = CKEDITOR.instances['ckeditor'].getData();
    var total = $('#total').text().toString().replace(/[^0-9]+/g,"");
    var url = $(this).attr('data-url');

    var daftar = $('.daftar-item option:selected').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Item tidak boleh kosong!');
        } else {
            return $(this).val();
        }
    }).get();
    var qty = $('.qty-item').map(function() {
        if ($(this).val() == null || $(this).val() == '') {
            alert('Qty tidak boleh kosong');
        } else {
            return $(this).val();
        }
    }).get();
    var subtotal = $('.subtotal-item').map(function() {
        return $(this).text().toString().replace(/[^0-9]+/g,"");
    })

    if (daftar.length != qty.length) {
        alert('Jumlah Item dan nilai Qty tidak cocok!');
    }

    var boq = [];
    $.each(daftar, function(i, v) {
        /* iterate through array or object */
        boq[i] = [v, qty[i], subtotal[i]];
    });

    if ($('#form-tambah-pekerjaan').valid()) {
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
        success = function(data) {
            var response = $.parseJSON(data);
            var response_status = response['status'];
            if (response_status == 'success') {
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
                total: total,
                boq: boq
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

    $('#nama-pekerjaan').val('');
    var deskripsi = CKEDITOR.instances['ckeditor'].setData('');
    $('.daftar-item').val('default');
    $('.daftar-item').selectpicker('refresh');
    $('.qty-item').val('');
    $('.subtotal-item').text('');
    $('#total').text('');
});

var btnDetailClick = function(id) {
    swal({
        text: 'Anda yakin ingin melihat detail item dengan id ' + id + '?'
    });
}

var btnEditClick = function(id) {
    swal({
        text: 'Anda yakin ingin mengedit item dengan id ' + id + '?'
    });
}

var btnDeleteClick = function(id) {
    swal({
        text: 'Anda yakin ingin menghapus item dengan id ' + id + '?'
    });
}