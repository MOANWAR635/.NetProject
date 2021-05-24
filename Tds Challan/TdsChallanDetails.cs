using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SavvyShippingDataFramework;
using System.Data;
using System.Data.SqlClient;
using FinanceObjectFramework;
/// <summary>
/// Summary description for TdsChallanDetails
/// </summary>
public class TdsChallanDetails
{
    List<SqlParameter> objSqlParameterList = null;
    public TdsChallanDetails()
	{

    }

    public DataTable SelectLedgerCode()
    {
        DataTable objTable = null;
        objSqlParameterList = new List<SqlParameter>();
        try
        {
            string sqlQuery = "SELECT DISTINCT A.L_CODE, A.GL_DESC FROM GEN_LED_MAST A, TDS_MAST B WHERE A.L_CODE=B.GEN_LED_CODE";
            objTable = SqlDBManager.SelectDataset(objSqlParameterList, sqlQuery, CommandType.Text, MySqlConnection.DefaultFinance).Tables[0];
        }
        catch (Exception ex)
        {
            // throw ex;
        }
        return objTable;
    }

    public int SaveTdsChallanDetailEntry(TdsChallanDetailEntryObject objTdsChallan, string Userid)
    {
        int Result;
        try
        {
            objSqlParameterList = new List<SqlParameter>();
            
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@LedgerCode", objTdsChallan.Ledgercode);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@ChallanDate", objTdsChallan.ChallanDate);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@BankBsrCode", objTdsChallan.BankBsrCode);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@ChequeDDNo ", objTdsChallan.chequeDDNO);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@ChallanId", objTdsChallan.ChallanId);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Quarter1", objTdsChallan.Quarter1);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Quarter2", objTdsChallan.Quarter2);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Quarter3", objTdsChallan.Quarter3);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Quarter4", objTdsChallan.Quarter4);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Month", objTdsChallan.Month);
            AddSqlParameter.AddNewParameter(objSqlParameterList, "@Year", objTdsChallan.Year);

            Result = Convert.ToInt32(SqlDBManager.SelectScalarData(objSqlParameterList, "UDSP_SAVE_TDS_CHALLAN_DETAIL_ENTRY", CommandType.StoredProcedure, MySqlConnection.CustomConnectionString));
        }
        catch (Exception ex)
        {
            throw;
        }
        return Result;
    }



}