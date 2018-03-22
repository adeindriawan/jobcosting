<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	var $head, $incHead, $nav, $incNav, $menu, $incMenu, $footer, $incFooter;

	public function __construct()
	{
		parent::__construct();

		$this->head = [
						'title' => 'Jobcosting',
						'styles' => 
							[
								'bootstrap' => 'assets/backview/plugins/bootstrap/css/bootstrap.css',
								'waves' => 'assets/backview/plugins/node-waves/waves.css',
								'bootstrap-material-datetimepicker' => 'assets/backview/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
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
						'title' => 'Jobcosting',
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
									'slimscroll' => 'assets/backview/plugins/jquery-slimscroll/jquery.slimscroll.js',
									'waves' => 'assets/backview/plugins/node-waves/waves.js',
									'bootstrap-select' => 'assets/backview/plugins/bootstrap-select/js/bootstrap-select.js',
									'autosize' => 'assets/backview/plugins/autosize/autosize.js',
									'moment' => 'assets/backview/plugins/momentjs/moment.js',
									'datetimepicker' => 'assets/backview/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
									'ckeditor' => 'assets/backview/plugins/ckeditor/ckeditor.js',
									'jquery-datatable' => 'assets/backview/plugins/jquery-datatable/jquery.dataTables.js',
									'bootstrap-datatable' => 'assets/backview/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js',
									'toooltips-popover' => 'assets/backview/js/pages/ui/tooltips-popovers.js',
									'waitme' => 'assets/backview/plugins/waitme/waitMe.js',
									'sweetalert' => 'assets/backview/plugins/sweetalert/sweetalert-2.0.8.min.js',
									'layout' => 'assets/backview/js/admin.js',
									'sidebar' => 'assets/backview/js/demo.js'
								],
					];
		$this->incFooter = $this->load->view('includes/footer', $this->footer, TRUE);
	}

	public function index()
	{
		$data['head'] = $this->incHead;
		$data['nav'] = $this->incNav;
		$data['menu'] = $this->incMenu;
		$data['footer'] = $this->incFooter;

		$this->load->view('index', $data);
	}

}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */