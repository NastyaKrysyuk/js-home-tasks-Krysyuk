function TAJAXStorage() {
  var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  var self = this,
      pHash = {};

      $.ajax(AjaxHandlerScript,
			{type: "POST",
       cache: false,
       dataType: "json",
       data: {
        f: "READ",
        n: "NastyaK_DRINKS"},
        success: ReadData, 
        error: ErrorHandler
      }
		);
    function ReadData(data) {			
			if (data !== " ") {
				pHash = JSON.parse(data.result);

				console.log("ReadData - " + data.result);
			} else if (data === " ") {
				$.ajax(AjaxHandlerScript,
					{type: "POST",
          cache: false, 
          dataType: "json", 
          data: {
            f: "INSERT",
            n: "NastyaK_DRINKS", 
            v: JSON.stringify(pHash)}, 
            success: DataLoadedInsert, 
            error: ErrorHandler}
				);

				function DataLoadedInsert(data) {
					console.log("DataLoadedInsert - " + data.result);
				}				
			}
		}

    function addValueOnTheServer(hash) {
			var password = Math.random();

			$.ajax(AjaxHandlerScript,
				{type: "POST", 
        cache: false, 
        dataType: "json", 
        data: {
          f: "LOCKGET", 
          n: "NastyaK_DRINKS", 
          p: password}, 
          success: LockgetData, 
          error: ErrorHandler}
			);

			function LockgetData(data) {
				console.log("LockgetData - " + data.result);

				$.ajax(AjaxHandlerScript,
					{type: "POST", 
          cache: false, 
          dataType: "json", 
          data: {
            f: "UPDATE", 
            n: "NastyaK_DRINKS", 
            p: password, 
            v: JSON.stringify(hash)}, 
            success: DataLoadedUpdate, 
            error: ErrorHandler}
				);

				function DataLoadedUpdate(data) {
					console.log("DataLoadedUpdate - " + data.result);
				}
			}	
		}

		function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
			alert(StatusStr + " " + ErrorStr);
		}

  self.addValue = function(key, value) {
    pHash[key] = value;
    addValueOnTheServer(pHash);
  };

  self.getValue = function(key) {
    return pHash[key];
  };

  self.deleteValue = function(key) {
    if (key in pHash) {
      delete pHash[key];
      addValueOnTheServer(pHash);
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function() {
    return (Object.keys(pHash));
  };
}