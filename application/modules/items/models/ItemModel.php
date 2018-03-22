<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ItemModel extends CI_Model {

	public $variable;

	public function __construct()
	{
		parent::__construct();
		
	}

	public function filterItems($jenis, $satuan)
	{
		$this->db->select('*', FALSE);
		$this->db->from('item');
		if ($jenis != NULL) {
			$this->db->where('jenis', $jenis);
		}
		if ($satuan != NULL) {
			$this->db->where('satuan', $satuan);
		}
		$query = $this->db->get()->result_array();
		return $query;
	}

	public function joinWithAccounts($search, $length, $start)
	{
		$this->db->select('i.*, a.nama AS nama_akun');
		$this->db->from('item i');
		if ($search != '') {
			$this->db->like('i.nama', $search, 'both');
			$this->db->or_like('a.nama', $search, 'both');
		}
		$this->db->join('akun a', 'i.akun = a.id', 'left');
		$this->db->limit($length, $start);
		$query = $this->db->get()->result_array();
		return $query;
	}

}

/* End of file ItemModel.php */
/* Location: ./application/models/ItemModel.php */