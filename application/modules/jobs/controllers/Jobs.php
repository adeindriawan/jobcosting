<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jobs extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->head = [
						'title' => 'Jobs',
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
		$this->incHead = $this->load->view('includes/head', $this->head, TRUE);

		$this->nav = [
						'title' => 'Jobcosting'
					];
		$this->incNav = $this->load->view('includes/nav', $this->nav, TRUE);

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
		$this->incMenu = $this->load->view('includes/menu', $this->menu, TRUE);

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
									'page' => 'assets/backview/scripts/jobs.js',
									'sidebar' => 'assets/backview/js/demo.js'
								],
					];
		$this->incFooter = $this->load->view('includes/footer', $this->footer, TRUE);
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
		$data['bb'] = $this->db->select('*')->from('item')->where('jenis', 1)->get()->result_array();
		$data['tkl'] = $this->db->select('*')->from('item')->where('jenis', 2)->get()->result_array();
		$data['ovr'] = $this->db->select('*')->from('item')->where('jenis', 3)->get()->result_array();
		$this->load->view('form', $data);
	}

	public function add()
	{
		$data['nama'] = $this->input->post('nama', TRUE);
		$data['deskripsi'] = $this->input->post('deskripsi', TRUE);
		$data['nominal'] = $this->input->post('total', TRUE);
		$boq = $this->input->post('boq', TRUE);

		$this->db->insert('pekerjaan', $data);
		$idPekerjaan = $this->db->insert_id();

		$item['id_pekerjaan'] = $idPekerjaan;
		foreach ($boq as $key => $value) {
			$item['id_item'] = $value[0];
			$item['qty_item'] = $value[1];
			$item['nominal_item'] = $value[2];
			$this->db->insert('item_pekerjaan', $item);
		}

		echo 'true';
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
		$query = $this->db->get('pekerjaan')->result_array();
		$query = json_encode($query);
		echo $query;
	}

}

/* End of file Jobs.php */
/* Location: ./application/controllers/Jobs.php */