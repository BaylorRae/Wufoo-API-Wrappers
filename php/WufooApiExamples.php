<?php

require_once('WufooApiWrapper.php');

/**
 * All available methods and an example of how to call them.
 *
 * @package default
 * @author Timothy S Sabat
 */
class WufooApiExamples {
	
	private $apiKey;
	private $subdomain;
	
	public function __construct($apiKey, $subdomain, $domain = 'wufoo.com') {
		$this->apiKey = $apiKey;
		$this->subdomain = $subdomain;
		$this->domain = $domain;
	}
	
	public function getForms($identifier = null) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getForms($identifier); 
	}
	
	public function getFields($identifier) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getFields($identifier); 
	}
	
	public function getEntries($identifier) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getEntries($identifier); 
	}
	
	public function getUsers() {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getUsers(); 
	}
	
	public function getReports($identifier = null) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getReports($identifier); 
	}
	
	public function getWidgets($identifier) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getWidgets($identifier); 
	}
	
	public function getReportFields($identifier) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getReportFields($identifier); 
	}
	
	public function getReportEntries($identifier) {
		$wrapper = new WufooApiWrapper($this->apiKey, $this->subdomain, $this->domain);
		return $wrapper->getReportEntries($identifier); 
	}

}

?>