<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Transactions extends CI_Controller {

	var $head, $incHead, $nav, $incNav, $menu, $incMenu, $footer, $incFooter;

	public function __construct()
	{
		parent::__construct();
		$this->load->model('TransactionModel');

		$this->head = [
						'title' => 'Transactions',
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
									'page' => 'assets/backview/scripts/transactions.js',
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
		$data['jenis_transaksi'] = $this->db->get('jenis_transaksi')->result_array();
		$this->load->view('form', $data);
	}

	public function transaction_categories()
	{
		$response['data'] = $this->db->get('jenis_transaksi')->result_array();
		$response['code'] = 200;
		$response['status'] = 'success';
		$response['message'] = 'All transaction categories have been successfully fetched.';
		$response['description'] = 'All transaction categories have been successfully fetched.';
		$response = json_encode($response);
		echo $response;
	}

	public function add()
	{
		$data['nama'] = $this->input->post('nama', TRUE);
		$data['deskripsi'] = $this->input->post('deskripsi', TRUE);
		$data['nominal'] = $this->input->post('nominal', TRUE);
		$data['waktu'] = date('Y-m-d H:i:s');
		$data['id_jenis_transaksi'] = $this->input->post('jenis_transaksi', TRUE);
		$this->db->insert('transaksi', $data);
		$idTransaksi = $this->db->insert_id();

		
		$jrn['id_transaksi'] = $idTransaksi;
		$this->db->get_where('jenis_transaksi_akun', array('id_jenis_transaksi' => $data['id_jenis_transaksi']));
		$jrn['id_akun'] = False;
		$jrn['nominal'] = False;
		$jrn['sisi'] = False;
		$this->db->insert('jurnal', $jrn);
	}

	public function group_form()
	{
		$data['head'] = $this->incHead;
		$data['nav'] = $this->incNav;
		$data['menu'] = $this->incMenu;
		$data['footer'] = $this->incFooter;
		$data['akun'] = $this->db->select('id, nama')->from('akun')->get()->result_array();
		$this->load->view('group_form', $data);
	}

	public function add_group()
	{
		$data['jenis'] = $this->input->post('nama', TRUE);
		$data['deskripsi'] = $this->input->post('deskripsi', TRUE);
		$jurnal = $this->input->post('jurnal', TRUE);

		$this->db->insert('jenis_transaksi', $data);
		$idJenisTransaksi = $this->db->insert_id();
		$jta['id_jenis_transaksi'] = $idJenisTransaksi;
		foreach ($jurnal as $value) {
			$jta['id_akun'] = $value[0];
			$jta['sisi_akun'] = $value[1];
			$this->db->insert('jenis_transaksi_akun', $jta);
		}

		echo 'true';
	}

	public function accounts_of_a_transaction_category($id)
	{
		$response['data'] = $this->TransactionModel->getAccountsOfATransactionCategory($id);
		$response['code'] = 200;
		$response['status'] = 'success';
		$response['message'] = 'All accounts from the transaction category have been fetched.';
		$response['description'] = 'All accounts from the transaction category have been fetched.';
		$response = json_encode($response);
		echo $response;
	}
}

/* End of file Transactions.php */
/* Location: ./application/controllers/Transactions.php */