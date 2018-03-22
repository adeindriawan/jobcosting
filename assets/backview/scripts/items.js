$(function () {
    var base_url = $('body').data('base-url');

    //CKEditor
    if ($('textarea#ckeditor').length) {
    	CKEDITOR.replace('ckeditor');
    	CKEDITOR.config.height = 300;
    };

    if ($('#form-tambah-item').length) {
        $('#form-tambah-item').validate({
            ignore: [], // karena menggunakan bootstrap-select
            rules: {
                jenis: {
                    required: true
                },
                satuan: {
                    required: true
                },
                harga: {
                    required: true
                },
                akun: {
                    required: true
                }
            }
        });

        $('#akun-item').selectpicker({
            dropupAuto: false
        });

        $.get(base_url + 'items/accounts', function(data, status) {
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
                        var kode = (v.kode != null) ? v.kode : '[Tidak ada kode]' ;
                        options += '<option value="'+ v.id +'">'+ v.nama + ' | ' + kode +'</option>';
                        iter++;
                        if (response_data.length == iter) {
                            $('#akun-item').append(options);
                            $('#akun-item').selectpicker('refresh');
                        };
                    });
                } else{
                    alert('Terjadi error dalam mengambil data akun! Kode: 02');
                };
            } else {
                alert('Terjadi error dalam mengambil data akun! Kode: 01');
            };
        });
    };

    if ($('#tabel-item').length) {
        var url = $('#tabel-item').attr('data-url');
        $.get(url, function(data) {
            /*optional stuff to do after success */
            var response = $.parseJSON(data);
            var rows = '';
            var iter = 0;
            $.each(response, function(i, v) {
                
                /* iterate through array or object */
                var btn_detail = '<button type="button" value="'+ v.id +'" class="btn btn-primary btn-circle waves-effect waves-circle waves-float btn-detail" data-toggle="tooltip" data-placement="top" title="Detail item"><i class="material-icons">zoom_in</i></button>';
                var btn_edit = '<button type="button" value="'+ v.id +'" class="btn btn-info btn-circle waves-effect waves-circle waves-float btn-edit" data-toggle="tooltip" data-placement="top" title="Edit item"><i class="material-icons">mode_edit</i></button>';
                var btn_delete = '<button type="button" value="'+ v.id +'" class="btn btn-danger btn-circle waves-effect waves-circle waves-float btn-delete" data-toggle="tooltip" data-placement="top" title="Hapus item"><i class="material-icons">delete</i></button>';
                
                switch(v.jenis) {
                    case '1':
                        var j_item = 'Bahan Baku';
                        break;

                    case '2':
                        var j_item = 'Tenaga Kerja Langsung';
                        break;

                    case '3':
                        var j_item = 'Overhead';
                        break;

                    default:
                        var j_item = 'Tidak ditentukan';
                }
                
                $('#tabel-item tbody').html('');
                rows += '<tr id="tr'+ v.id +'"><td>'+ v.nama +'</td><td>'+ j_item +'</td><td>'+ v.harga +'</td><td>'+ v.satuan +'</td><td>'+ btn_detail + btn_edit + btn_delete + '</td></tr>';
                iter++;
                if (response.length === iter) {
                    $('#tabel-item').append(rows);
                    $('.btn-detail').click(function(event) { // callback dipanggil di sini
                        var id = $(this).val();
                        btnDetailClick(id);
                    });
                    $('.btn-edit').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnEditClick(id);
                    });
                    $('.btn-delete').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnDeleteClick(id);
                    });
                };
            });
        });
    };
});

$('#tombol-tambah-item').click(function(event) {
    /* Act on the event */
    var url = $(this).data('url');
    var nama = $('#nama-item').val();
    var harga = $('#harga-item').val();
    var jenis = $('#jenis-item').val();
    var satuan = $('#satuan-item').val();
    var akun = $('#akun-item').val();
    var deskripsi = CKEDITOR.instances['ckeditor'].getData();

    if ($('#form-tambah-item').valid()) {
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
                harga: harga,
                jenis: jenis,
                satuan: satuan,
                akun: akun,
                deskripsi: deskripsi
            },
            beforeSend: beforeSend,
            success: success,
            error: error
        });
        $('#nama-item').val('');
        $('#harga-item').val('');
        CKEDITOR.instances['ckeditor'].setData('');
        $('#jenis-item option:eq(0)').prop('selected', true);
        $('#jenis-item').selectpicker('refresh');
        $('#satuan-item option:eq(0)').prop('selected', true);
        $('#satuan-item').selectpicker('refresh');
        $('#akun-item option:eq(0)').prop('selected', true);
        $('#akun-item').selectpicker('refresh');
    } else{
        $('#nama-item').val('');
        $('#harga-item').val('');
        CKEDITOR.instances['ckeditor'].setData('');
        $('#jenis-item option:eq(0)').prop('selected');
        $('#jenis-item').selectpicker('refresh');
        $('#satuan-item option:eq(0)').prop('selected');
        $('#satuan-item').selectpicker('refresh');
        $('#akun-item option:eq(0)').prop('selected');
        $('#akun-item').selectpicker('refresh');
        swal({
            icon: 'error',
            text: 'Harap isi semua isian yang wajib.'
        });
    };
});

$('#jenis').on('change', function(event) {
    var url = $(this).attr('data-url');
    var base_url = $(this).attr('data-base-url');
    event.preventDefault();
    if ($('#jenis').val()) {var jenis = $('#jenis').val()} else{var jenis = null};
    if ($('#satuan').val()) {var satuan = $('#satuan').val()} else{var satuan = null};

    var attributes = [jenis, satuan];
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
        $('.content').waitMe('hide');
        var response = $.parseJSON(response);
        var rows = '';
        if (response.length > 0) {
            var iter = 0;
            $.each(response, function(i, v) {
                /* iterate through array or object */
                var btn_detail = '<button type="button" value="'+ v.id +'" class="btn btn-primary btn-circle waves-effect waves-circle waves-float btn-detail" data-toggle="tooltip" data-placement="top" title="Detail item"><i class="material-icons">zoom_in</i></button>';
                var btn_edit = '<button type="button" value="'+ v.id +'" class="btn btn-info btn-circle waves-effect waves-circle waves-float btn-edit" data-toggle="tooltip" data-placement="top" title="Edit item"><i class="material-icons">mode_edit</i></button>';
                var btn_delete = '<button type="button" value="'+ v.id +'" class="btn btn-danger btn-circle waves-effect waves-circle waves-float btn-delete" data-toggle="tooltip" data-placement="top" title="Hapus item"><i class="material-icons">delete</i></button>';
                
                switch(v.jenis) {
                    case '1':
                        var j_item = 'Bahan Baku';
                        break;

                    case '2':
                        var j_item = 'Tenaga Kerja Langsung';
                        break;

                    case '3':
                        var j_item = 'Overhead';
                        break;

                    default:
                        var j_item = 'Tidak ditentukan';
                }
                
                $('#tabel-item tbody').html('');
                rows += '<tr id="tr'+ v.id +'"><td>'+ v.nama +'</td><td>'+ j_item +'</td><td>'+ v.harga +'</td><td>'+ v.satuan +'</td><td>'+ btn_detail + btn_edit + btn_delete + '</td></tr>';
                iter++;
                if (response.length === iter) {
                    $('#tabel-item').append(rows);
                    $('.btn-detail').click(function(event) { // callback dipanggil di sini
                        var id = $(this).val();
                        btnDetailClick(id);
                    });
                    $('.btn-chat').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnChatClick(id);
                    });
                    $('.btn-edit').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnEditClick(id);
                    });
                    $('.btn-delete').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnDeleteClick(id);
                    });
                };
            });
        } else {
            $('#tabel-item tbody').html('');
            rows = '<tr><td>Tidak ada data</td><td></td><td></td><td></td><td></td></tr>';
            $('#tabel-item').append(rows);
        };
    }
    error = function() {
        swal({
            icon: 'error'
        })
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {attributes: attributes},
        beforeSend: beforeSend,
        success: success,
        error: error
    });
});

$('#satuan').on('change', function(event) {
    var url = $(this).attr('data-url');
    var base_url = $(this).attr('data-base-url');
    event.preventDefault();
    if ($('#jenis').val()) {var jenis = $('#jenis').val()} else{var jenis = null};
    if ($('#satuan').val()) {var satuan = $('#satuan').val()} else{var satuan = null};

    var attributes = [jenis, satuan];
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
        $('.content').waitMe('hide');
        var response = $.parseJSON(response);
        var rows = '';
        if (response.length > 0) {
            var iter = 0;
            $.each(response, function(i, v) {
                /* iterate through array or object */
                var btn_detail = '<button type="button" value="'+ v.id +'" class="btn btn-primary btn-circle waves-effect waves-circle waves-float btn-detail" data-toggle="tooltip" data-placement="top" title="Detail item"><i class="material-icons">zoom_in</i></button>';
                var btn_edit = '<button type="button" value="'+ v.id +'" class="btn btn-info btn-circle waves-effect waves-circle waves-float btn-edit" data-toggle="tooltip" data-placement="top" title="Edit item"><i class="material-icons">mode_edit</i></button>';
                var btn_delete = '<button type="button" value="'+ v.id +'" class="btn btn-danger btn-circle waves-effect waves-circle waves-float btn-delete" data-toggle="tooltip" data-placement="top" title="Hapus item"><i class="material-icons">delete</i></button>';
                
                switch(v.jenis) {
                    case '1':
                        var j_item = 'Bahan Baku';
                        break;

                    case '2':
                        var j_item = 'Tenaga Kerja Langsung';
                        break;

                    case '3':
                        var j_item = 'Overhead';
                        break;

                    default:
                        var j_item = 'Tidak ditentukan';
                }
                
                $('#tabel-item tbody').html('');
                rows += '<tr id="tr'+ v.id +'"><td>'+ v.nama +'</td><td>'+ j_item +'</td><td>'+ v.harga +'</td><td>'+ v.satuan +'</td><td>'+ btn_detail + btn_edit + btn_delete + '</td></tr>';
                iter++;
                if (response.length === iter) {
                    $('#tabel-item').append(rows);
                    $('.btn-detail').click(function(event) { // callback dipanggil di sini
                        var id = $(this).val();
                        btnDetailClick(id);
                    });
                    $('.btn-chat').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnChatClick(id);
                    });
                    $('.btn-edit').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnEditClick(id);
                    });
                    $('.btn-delete').click(function(event) {
                        /* Act on the event */
                        var id = $(this).val();
                        btnDeleteClick(id);
                    });
                };
            });
        } else {
            $('#tabel-item tbody').html('');
            rows = '<tr><td>Tidak ada data</td><td></td><td></td><td></td><td></td></tr>';
            $('#tabel-item').append(rows);
        };
    }
    error = function() {
        swal({
            icon: 'error'
        })
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {attributes: attributes},
        beforeSend: beforeSend,
        success: success,
        error: error
    });
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