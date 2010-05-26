<?php

/**
 * Encapsulates the utility functions not required by user.
 *
 * @package default
 * @author Timothy S Sabat
 */
class WufooApiWrapperBase {

	protected function getHelper($url, $type, $iterator, $index = 'Hash') {
		$this->curl = new WufooCurl();
		$response = $this->curl->getAuthenticated($url, $this->apiKey);
		$response = json_decode($response);
		$className = 'Wufoo'.$type;
		foreach ($response->$iterator as $obj) {
			$arr[$obj->$index] = new $className($obj);
		}
		return $arr;
	}
	
	protected function getFullUrl($url) {
		return 'https://'.$this->subdomain.'.'.$this->domain.'/api/v3/'.$url.'.json';
	}
}


class WufooCurl {
	
	public function __construct() {
		//TIMTODO: set timout
	}
	
	public function getAuthenticated($url, $apiKey) {
		$this->curl = curl_init($url); 
		curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($this->curl, CURLOPT_USERPWD, $apiKey.':footastical');
		curl_setopt($this->curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($this->curl, CURLOPT_SSL_VERIFYPEER, false);
		//http://bugs.php.net/bug.php?id=47030
		curl_setopt($this->curl, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($this->curl, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($this->curl, CURLOPT_USERAGENT, 'Wufoo API Wrapper.com');

		$response = curl_exec($this->curl);
		$this->getResultCodes();
		
		$this->checkForCurlErrors();
		$this->checkForGetErrors($response);
		curl_close($this->curl);
		return $response;
	}
	
	private function checkForCurlErrors() {
		if(curl_errno($this->curl)) {
			if ($closeConnection) curl_close($this->curl);
			throw new WufooException(curl_error($this->curl), curl_errno($this->curl));
		}
	}
	
	private function checkForGetErrors($response) {
		if ($this->ResultStatus['http_code'] != 200) {
			if ($response) {
				$obj = json_decode($response);
				throw new WufooException('('.$obj->HTTPCode.') '.$obj->Text, $this->ResultStatus['HTTP_CODE']);
			}
		}
	}
	
	private function getResultCodes() {
		$this->ResultStatus = curl_getinfo($this->curl);		
	}
}

/**
 * Thrown by WufooCurl calls.
 *
 * @package default
 * @author Timothy S Sabat
 */
class WufooException extends Exception {
	
	public function __construct($message, $code) {
		parent::__construct($message, $code);
	}
	
};

?>