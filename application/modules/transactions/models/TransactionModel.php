<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TransactionModel extends CI_Model {

	public $variable;

	public function __construct()
	{
		parent::__construct();
		
	}

	public function getAccountsOfATransactionCategory($id)
	{
		$this->db->select('jt.*, jta.*, a.nama');
		$this->db->from('jenis_transaksi jt');
		$this->db->where('jt.id', $id);

		$this->db->join('jenis_transaksi_akun jta', 'jta.id_jenis_transaksi = jt.id', 'left');
		$this->db->join('akun a', 'a.id = jta.id_akun', 'left');

		$query = $this->db->get()->result_array();
		return $query;
	}

}

/* End of file TransactionModel.php */
/* Location: ./application/models/TransactionModel.php */