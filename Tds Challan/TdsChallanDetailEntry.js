(function ($) {
    $(document).ready(function () {
       
        $('#BtnUpdate').SBT({ width: '100' });
        $('#BtnSave').SBT({ width: '100' });
        $('#BtnCancel').SBT({ width: '100' });
         
        $("#dtChallanDate").SI({ width: '100', disabled: false });

        BindddlLedgerCode();
        Disable_Save_Controls();
        ValidateControl();

        $('#BtnUpdate').on('click', function () {
            BtnUpdateClick();
        });

        $('#BtnCancel').on('click', function () {            
            Clear_Save_Controls();
        });
               
    });

    BindddlLedgerCode = function () {        
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'GL_DESC' },
                { name: 'L_CODE' }
            ],
            record: 'OutputTable',
            url: 'TdsChallanDetailEntry.aspx/GetLedgerCode',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlLedgerCode').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "GL_DESC", valueMember: "L_CODE", placeHolder: 'Ledger Code', selectedIndex: 0, height: '25', width: '90%'
        });
        $("#ddlLedgerCode").SQ('insertAt', 'Ledger Code', 0);
    };


    Disable_Save_Controls = function () {
        $('#ddlLedgerCode').SQ({ disabled: true });
        $('#dtChallanDate').SI('disabled', true);
        $('#txtBankBSRCode').prop('disabled', true);
        $('#txtChequeDDNo').prop('disabled', true);
        $('#txtChallanID').prop('disabled', true);
        $('#txtQuarter1').prop('disabled', true);
        $('#txtQuarter2').prop('disabled', true);
        $('#txtQuarter3').prop('disabled', true);
        $('#txtQuarter4').prop('disabled', true);
        $('#txtMonth').prop('disabled', true);
        $('#txtYear').prop('disabled', true);
        $('#BtnSave').SBT('disabled', true);
        $('#BtnCancel').SBT('disabled', true);
        
    };

    BtnUpdateClick = function () {
        $('#ddlLedgerCode').SQ({ disabled: false });
        $('#dtChallanDate').SI('disabled', false);
        $('#txtBankBSRCode').prop('disabled', false);
        $('#txtChequeDDNo').prop('disabled', false);
        $('#txtChallanID').prop('disabled', false);
        $('#txtQuarter1').prop('disabled', false);
        $('#txtQuarter2').prop('disabled', false);
        $('#txtQuarter3').prop('disabled', false);
        $('#txtQuarter4').prop('disabled', false);
        $('#txtMonth').prop('disabled', false);
        $('#txtYear').prop('disabled', false);
        $('#BtnSave').SBT('disabled', false);
        $('#BtnCancel').SBT('disabled', false);
        $('#BtnUpdate').SBT('disabled', true);

    }

    $('#dvTdsChallanDetails').on('validationSuccess', function (event) {
        var ledgerCode = $('#ddlLedgerCode').SQ('getSelectedItem').value;
        var challanDate = $('#dtChallanDate').SI('getText');
        var bankBsrCode = $('#txtBankBSRCode').val();
        var chequeDDNO = $('#txtChequeDDNo').val();
        var challanId = $('#txtChallanID').SQ('getSelectedItem').label;  //.value
        var quarter1 = $('#txtQuarter1').val();
        var quarter2 = $('#txtQuarter2').val();
        var quarter3 = $('#txtQuarter3').val();
        var quarter4 = $('#txtQuarter4').val();
        var month = $('#txtMonth').val();
        var year = $('#txtYear').val();

        $.ajax({
            type: 'POST',
            url: 'TdsChallanDetailEntry.aspx/SaveTdsChallanDetailsEntry',
            async: true,
            cache: true,
            data: "{'ledgercode':'" + ledgerCode + "',  'challanDate':'" + challanDate + "' ,   'bankBsrCode':'" + bankBsrCode + "' ,  'chequeDDNO ':'" + chequeDDNO  + "','challanId':'" + challanId + "','quarter1':'" + quarter1 + "','quarter2':'" + quarter2 + "','quarter3':'" + quarter3 + "','quarter4':'" + quarter4 + "','month':'" + month + "','year':'" + year  + "'}",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                if (parseInt(response.d) > 0) {
                    MessageControl('#myMessage', 'myMessageSuccess', 'TDS Challan Details Entry Saved Successfully.');                    
                    BtnCancelClick();                    
                }
                else if (parseInt(response.d) == -1) {
                    MessageControl('#myMessage', 'myMessageError', 'TDS Challan Details is not available to update.');
                }
                else if (parseInt(response.d) == 0) {
                     MessageControl('#myMessage', 'myMessageError', 'Error during saving the Tds Challan Details Entry.');
                }
            },
            failure: function (response) {
                MessageControl('#myMessage', 'myMessageError', 'Try Connecting');
            },
            error: function (xhr, errorType, exception) {
                var errorMessage = exception || xhr.statusText;
                MessageControl('#myMessage', 'myMessageError', 'Try Connecting' + errorMessage);
            }
        });
    });

    ValidateControl = function () {
        $('#dvTdsChallanDetails').SA({
            hintType: 'label',
            animationDuration: 0,
            rules: [
                {
                    input: '#ddlLedgerCode', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlLedgerCode").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },                
                {
                    input: '#dtChallanDate', message: 'Required !', action: 'change, blur', rule: function (input, commit) {
                        var dtChallanDate = $('#dtChallanDate').SI('val');
                        if (dtChallanDate == '') {
                            return false;
                        }
                        return true;
                    }
                },
                { input: '#txtBankBSRCode', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtChallanID', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtQuarter1', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtQuarter2', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtQuarter3', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtQuarter4', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtChequeDDNo', message: 'Required!', action: 'keyup, blur', rule: 'required' },
                { input: '#txtMonth', message: 'Enter numeric!', action: 'keyup, blur', rule: 'number' },
                { input: '#txtYear', message: 'Enter numeric!', action: 'keyup, blur', rule: 'number' },                
            ]
        });
    };

    Clear_Save_Controls = function () {
        $('#ddlLedgerCode').SQ('clearSelection');
        $('#dtChallanDate').SI({ value: null });
        $('#txtBankBSRCode').val('');
        $('#txtChequeDDNo').val('');
        $('#txtChallanID').val('');
        $('#txtQuarter1').val('');
        $('#txtQuarter2').val('');
        $('#txtQuarter3').val('');
        $('#txtQuarter4').val('');        
        $('#txtMonth').val('');
        $('#txtYear').val('');
        
        $('#dvTdsChallanDetails').SA('hide');
    };

})(jQuery);