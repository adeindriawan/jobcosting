<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Items extends MX_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('ItemModel');
		$this->head = [
						'title' => 'Items',
						'styles' => 
							[
								'bootstrap' => 'assets/backview/plugins/bootstrap/css/bootstrap.css',
								'waves' => 'assets/backview/plugins/node-waves/waves.css',
								'bootstrap-select' => 'assets/backview/plugins/bootstrap-select/css/bootstrap-select.css',
								'waitme' => 'assets/backview/plugins/waitme/waitMe.css',
								'animate' => 'assets/backview/plugins/animate-css/animate.css',
								'sweetalert' => 'assets/backview/plugins/sweetalert/sweetalert.css',
								'datatables' => 'assets/backview/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css',
								'style' => 'assets/backview/css/style.css',
								'theme' => 'assets/backview/css/themes/all-themes.css',
							]
					];
		$this->incHead = $this->load->view('includes/backview/head', $this->head, TRUE);

		$this->nav = [
						'title' => 'Jobcosting'
					];
		$this->incNav = $this->load->view('includes/backview/nav', $this->nav, TRUE);

		$this->menu = [
						'session' => 
							[
								'id' => '1',
								'email' => 'johndoe@example.com',
								'nama' => 'John Doe',
								'avatar' => NULL,
								'telegram' => '1234567',
								'boss' => '2',
								'bisa_buat_tugas' => '1',
								'bisa_buat_user' => '1'
							],
					];
		$this->incMenu = $this->load->view('includes/backview/menu', $this->menu, TRUE);

		$this->footer = [
							'scripts' =>
								[
									'jquery' => 'assets/backview/plugins/jquery/jquery.min.js',
									'bootstrap' => 'assets/backview/plugins/bootstrap/js/bootstrap.js',
									'waves' => 'assets/backview/plugins/node-waves/waves.js',
									'slimscroll' => 'assets/backview/plugins/jquery-slimscroll/jquery.slimscroll.js',
									'bootstrap-select' => 'assets/backview/plugins/bootstrap-select/js/bootstrap-select.js',
									'validate' => 'assets/backview/plugins/jquery-validation/jquery.validate.js',
									'ckeditor' => 'assets/backview/plugins/ckeditor/ckeditor.js',
									'jquery-datatable' => 'assets/backview/plugins/jquery-datatable/jquery.dataTables.js',
									'bootstrap-datatable' => 'assets/backview/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js',
									'toooltips-popover' => 'assets/backview/js/pages/ui/tooltips-popovers.js',
									'waitme' => 'assets/backview/plugins/waitme/waitMe.js',
									'sweetalert' => 'assets/backview/plugins/sweetalert/sweetalert-2.0.8.min.js',
									'layout' => 'assets/backview/js/admin.js',
									'page' => 'assets/backview/scripts/items.js',
									'sidebar' => 'assets/backview/js/demo.js'
								],
					];
		$this->incFooter = $this->load->view('includes/backview/footer', $this->footer, TRUE);
	}

	public function index()
	{
		
	}

	public function form()
	{
		$data['head'] = $this->incHead;
		$data['nav'] = $this->incNav;
		$data['menu'] = $this->incMenu;
		$data['footer'] = $this->incFooter;
		$this->load->view('form', $data);
	}

	public function accounts()
	{
		$response['data'] = $this->db->select('id, nama, kode')->from('akun')->get()->result_array();
		$response['code'] = 200;
		$response['status'] = 'success';
		$response['message'] = 'All accounts data have been successfully fetched.';
		$response['description'] = 'All accounts data have been successfully fetched.';
		$response = json_encode($response);
		echo $response;
	}

	public function add()
	{
		$data['nama'] = $this->input->post('nama', TRUE);
		$data['harga'] = $this->input->post('harga', TRUE);
		$data['jenis']= $this->input->post('jenis', TRUE);
		$data['satuan'] = $this->input->post('satuan', TRUE);
		$data['akun'] = $this->input->post('akun', TRUE);
		$data['deskripsi'] = $this->input->post('deskripsi', TRUE);

		if ($data['nama'] && $data['jenis'] && $data['satuan'] && $data['akun']) {
			$this->db->insert('item', $data);
			echo 'true';
		} else {
			echo 'false';
		}
	}

	public function table()
	{
		$data['head'] = $this->incHead;
		$data['nav'] = $this->incNav;
		$data['menu'] = $this->incMenu;
		$data['footer'] = $this->incFooter;
		$this->load->view('table', $data);
	}

	public function get()
	{
		$query = $this->db->get('item')->result_array();
		$query = json_encode($query);

		echo $query;
	}

	public function filter()
	{
		if ($this->input->post('attributes')) {
			$attributes = $this->input->post('attributes');

			$jenis = ($attributes[0] == '') ? NULL : $attributes[0];
			$satuan = ($attributes[1] == '') ? NULL : $attributes[1];
		}

		$query = $this->ItemModel->filterItems($jenis, $satuan);

		echo json_encode($query);
	}

}

/* End of file Items.php */
/* Location: ./application/controllers/Items.php */