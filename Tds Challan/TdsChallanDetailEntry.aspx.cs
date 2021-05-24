using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using SavvyShippingDataFramework;
using FinanceBusinessFramework;
using FinanceObjectFramework;
public partial class Finance_TdsChallanDetailEntry : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }



    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetLedgerCode()
    {
        TdsChallanDetails objTdsChallanDetails = new TdsChallanDetails();
        DataTable dt = objTdsChallanDetails.SelectLedgerCode();
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }

    [WebMethod()]
    public static string SaveTdsChallanDetailsEntry(string ledgercode, string challanDate, 
        string bankBsrCode, string chequeDDNO, string challanId, string quarter1, string quarter2, string quarter3, string quarter4, string month, string year)
    {

        TdsChallanDetails objChallanDetails = new TdsChallanDetails();
        TdsChallanDetailEntryObject objTdsChallanDetailEntryObject = new TdsChallanDetailEntryObject();
        
        objTdsChallanDetailEntryObject.Ledgercode = HttpUtility.UrlDecode(ledgercode) ?? "";
        if (challanDate != "")
            objTdsChallanDetailEntryObject.ChallanDate = Utility.GetFormattedDate(challanDate);
        else
            objTdsChallanDetailEntryObject.ChallanDate = null;
        
        objTdsChallanDetailEntryObject.BankBsrCode = HttpUtility.UrlDecode(bankBsrCode) ?? "";
        objTdsChallanDetailEntryObject.chequeDDNO = HttpUtility.UrlDecode(chequeDDNO) ?? "";
        objTdsChallanDetailEntryObject.ChallanId = HttpUtility.UrlDecode(challanId) ?? "";
        objTdsChallanDetailEntryObject.Quarter1 = HttpUtility.UrlDecode(quarter1) ?? "";
        objTdsChallanDetailEntryObject.Quarter2 = HttpUtility.UrlDecode(quarter2) ?? "";
        objTdsChallanDetailEntryObject.Quarter3 = HttpUtility.UrlDecode(quarter3) ?? "";
        objTdsChallanDetailEntryObject.Quarter4 = HttpUtility.UrlDecode(quarter4) ?? "";
        objTdsChallanDetailEntryObject.Month = Convert.ToInt32(HttpUtility.UrlDecode(month) == "" ? "0" : HttpUtility.UrlDecode(month));
        objTdsChallanDetailEntryObject.Year = Convert.ToInt32(HttpUtility.UrlDecode(year) == "" ? "0" : HttpUtility.UrlDecode(year));


        string UserId = "";

        string result = "";
        result = Convert.ToString(objChallanDetails.SaveTdsChallanDetailEntry(objTdsChallanDetailEntryObject, UserId));
        return result;
    }



}