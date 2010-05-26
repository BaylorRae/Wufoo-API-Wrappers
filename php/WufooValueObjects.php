<?php

class ValueObject {
	
	public function __construct($obj) {
		if ($obj) {
			foreach ($obj as $key => $value) {
				$this->setProperty($key, $value, $obj->ID);
			}
		}
	}
	
	protected function setProperty($key, $value, $parentId) {
		$this->$key = $value;
	}
	
}

class WufooFieldCollection {
	
	public $Fields = array();
	public $Hash = array();
	
	public function getField($id) {
		return $this->Hash[$id];
	}
	
	public function getParent($subfield) {
		return $this->Fields[$subfield->ParentID];
	}
	
}

class WufooUser extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Name;
	public $IsPublic;
	public $Url;
	public $Description;
	public $DateCreated;
	public $DateUpdated;
	public $Hash;
	public $LinkFields;
	public $LinkEntries;
	public $LinkEntriesCount;
	public $LinkWidgets;
	
}

class WufooField extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Title;
	public $Type;
	public $ID;
	
	protected function setProperty($key, $value, $parentID) {
		switch ($key) {
			case 'SubFields':
				if ($value) {
					foreach ($value as $subfield) {
						$subfield->ParentID = $parentID;
						$this->SubFields[$subfield->ID] = $subfield;
					}
				}
				break;
			case 'Choices':
				foreach ($value as $choice) {
					$this->Choices[] = $choice;
				}
				break;
			default:
				$this->$key = $value;
				break;
		} 
	}
	
	
}

class WufooSubfield extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $ID;
	public $Label;
}

class WufooChoice extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Score;
	public $Label;
}

class WufooEntry extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
}

class WufooForm extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Name;
	public $Description;
	public $RedirectMessage;
	public $Url;
	public $Email;
	public $IsPublic;
	public $Language;
	public $StartDate;
	public $EndDate;
	public $EntryLimit;
	public $DateCreated;
	public $DateUpdated;
	public $Hash;
}

class WufooReport extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Name;
	public $Description;
	public $RedirectMessage;
	public $Url;
	public $Email;
	public $IsPublic;
	public $Language;
	public $StartDate;
	public $EndDate;
	public $EntryLimit;
	public $DateCreated;
	public $DateUpdated;
	public $Hash;
}

class WufooWidget extends ValueObject {
	
	public function __construct($obj = null) {
		parent::__construct($obj);
	}
	
	public $Name;
	public $Size;
	public $Type;
	public $TypeDesc;
	public $Hash;
}

?>