import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';
import { checkValue } from '../../utiles/check-value';

type CheerioRoot = ReturnType<typeof cheerio.load>;

export async function getWebScrapingGeneral(
  url: string,
  urlCookie: string,
  labelSelector: string,
  labelSelector2: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchData(url, urlCookie);
  try {
    const row = $(labelSelector).closest('tr');
    const value = row.find(labelSelector2).text().trim();

    const date = new Date().toISOString().slice(0, 10);
    checkValue(value);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

export async function getWebScrapingMethod2(
  url: string,
  urlCookie: string,
  labelSelector: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchData(url, urlCookie);
  try {
    const pesoChilenoElement = $(labelSelector);
    const value = pesoChilenoElement.next().text().trim();

    const date = new Date().toISOString().slice(0, 10);
    checkValue(value);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

async function getCoockies(urlCookie): Promise<Cookies> {
  try {
    const response: AxiosResponse = await axios.get(urlCookie, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'es-419,es;q=0.9',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
      },
    });

    const cookies: string[] | undefined = response.headers['set-cookie'];
    const cookiesParseadas: Cookies = parseCookies(cookies);
    return cookiesParseadas;
  } catch (error) {
    console.error('Ocurrió un error al hacer la solicitud:', error);
    return {};
  }
}

async function fetchData(url: string, urlCookie: string): Promise<CheerioRoot> {
  let responseAux;
  try {
    const cookieAux = await getCoockies(urlCookie);
    const payload = {
      ViewState: 'o8ipma82vtmaomms1jsuk82m5u',
      ClientStateXml:
        '<sawst:envState xmlns:sawst="com.siebel.analytics.web/state/v1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlVersion="200811100"><sawst:container cid="o:go" xsi:type="sawst:unknown"><sawst:container cid="r:report" xsi:type="sawst:report" links="bsfrd" defaultView="compoundView!1" searchId="m2fo4c3mv9inker4qnmeik7m16" folder="/shared/Series Estadísticas_T/1. Monedas disponibles" itemName="1.1.TCM_Datos diarios"/></sawst:container></sawst:envState>',
      fmapId: 'VZjAgQ',
      IgnoreBypassCacheOption: 'ignoreBypassCache',
      ViewPos: 'compoundView!1',
      Action: 'updateReport',
      ViewID: 'o:go~r:report~v:compoundView!1~v:tableView!1',
      refreshViewIDs: 'o:go~r:report~v:compoundView!1~v:tableView!1',
      layer: '0',
      _scid: '',
      icharset: 'utf-8',
      ReportXML: `<saw:report xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:saw="com.siebel.analytics.web/report/v1.1" xmlns:sawx="com.siebel.analytics.web/expression/v1.1" xmlVersion="201201160" cacheControl="bypassCache">
      <saw:criteria subjectArea="&quot;Tasas de cambio_T&quot;" xsi:type="saw:simpleCriteria" withinHierarchy="true">
         <saw:columns>
            <saw:column columnID="c7" xsi:type="saw:regularColumn">
               <saw:tableHeading>
                  <saw:caption fmt="text">
                     <saw:text>Fecha</saw:text></saw:caption></saw:tableHeading>
               <saw:columnHeading>
                  <saw:caption fmt="text">
                     <saw:text>Fecha</saw:text></saw:caption></saw:columnHeading>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">CAST(EVALUATE('PRO_SK_SHARE_F.DAY_NAME_SPANISH(CAST(%1 AS DATE)) || %5 || TO_CHAR(%1, %2) || %3 || PRO_SK_SHARE_F.MONTH_NAME_SPANISH(CAST(%1 AS DATE)) || %3 || TO_CHAR(%1, %4)', Fecha."Fecha (Date)",'DD',' de ','YYYY',', ') AS CHAR(50))</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c10" xsi:type="saw:regularColumn" forceGroupBy="true">
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">Fecha."Año"</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c2" xsi:type="saw:regularColumn" forceGroupBy="true">
               <saw:tableHeading>
                  <saw:caption fmt="text">
                     <saw:text>Moneda</saw:text></saw:caption></saw:tableHeading>
               <saw:columnHeading>
                  <saw:caption fmt="text">
                     <saw:text>Moneda</saw:text></saw:caption>
                  <saw:displayFormat>
                     <saw:formatSpec interaction="none"/></saw:displayFormat></saw:columnHeading>
               <saw:displayFormat>
                  <saw:formatSpec interaction="none" wrapText="true">
                     <saw:dataFormat xsi:type="saw:text" textFormat="html"/></saw:formatSpec></saw:displayFormat>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">Moneda.Moneda</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c9" xsi:type="saw:regularColumn">
               <saw:displayFormat>
                  <saw:formatSpec suppress="default" interaction="default" wrapText="true">
                     <saw:dataFormat xsi:type="saw:text" textFormat="html"/></saw:formatSpec></saw:displayFormat>
               <saw:columnHeading>
                  <saw:displayFormat>
                     <saw:formatSpec interaction="default"/></saw:displayFormat>
                  <saw:caption fmt="text">
                     <saw:text>Id Moneda</saw:text></saw:caption></saw:columnHeading>
               <saw:tableHeading>
                  <saw:caption fmt="text">
                     <saw:text>Moneda</saw:text></saw:caption></saw:tableHeading>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;'WHEN Moneda."Id Moneda" = 'USD' THEN 'USD' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'VEF' THEN 'VEF-DICOM' WHEN Moneda."Id Moneda" = 'VE1' THEN 'VEF-DIPRO'  ELSE Moneda."Id Moneda" END</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c3" xsi:type="saw:regularColumn" forceGroupBy="true">
               <saw:tableHeading>
                  <saw:caption>
                     <saw:text>Tipo de Cambio</saw:text></saw:caption></saw:tableHeading>
               <saw:columnHeading>
                  <saw:caption>
                     <saw:text>Tipo de cambio</saw:text></saw:caption></saw:columnHeading>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">"Tipo de Cambio"."Tipo de Cambio"</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c4" xsi:type="saw:regularColumn" forceGroupBy="true">
               <saw:displayFormat>
                  <saw:formatSpec suppress="default" interaction="default" hAlign="center" wrapText="true"/></saw:displayFormat>
               <saw:columnHeading>
                  <saw:displayFormat>
                     <saw:formatSpec interaction="default"/></saw:displayFormat>
                  <saw:caption>
                     <saw:text>Tipo de tasa</saw:text></saw:caption></saw:columnHeading>
               <saw:tableHeading>
                  <saw:caption>
                     <saw:text>Tipo de Tasa</saw:text></saw:caption></saw:tableHeading>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">CASE "Tipo de Tasa"."Tipo de Tasa" WHEN 'COMPRA' THEN 'Compra' WHEN 'MEDIA' THEN 'Media' WHEN 'VENTA' THEN 'Venta' END</sawx:expr></saw:columnFormula></saw:column>
            <saw:column columnID="c6" xsi:type="saw:regularColumn" forceGroupBy="true">
               <saw:displayFormat>
                  
                  <saw:formatSpec wrapText="true" hAlign="right" suppress="repeat">
                     <saw:dataFormat xsi:type="saw:number" commas="true" negativeType="minus" minDigits="5" maxDigits="5"/></saw:formatSpec><saw:conditionalDisplayFormats>
                     </saw:conditionalDisplayFormats></saw:displayFormat>
               <saw:columnHeading>
                  <saw:displayFormat>
                     <saw:formatSpec/></saw:displayFormat>
                  <saw:caption fmt="text">
                     <saw:text>Tasa de cambio</saw:text></saw:caption></saw:columnHeading>
               <saw:tableHeading>
                  <saw:caption fmt="text">
                     <saw:text>Tasas Cambio</saw:text></saw:caption></saw:tableHeading>
               <saw:columnFormula>
                  <sawx:expr xsi:type="sawx:sqlExpression">TRUNCATE("Tasas Cambio"."Valor", 6)</sawx:expr></saw:columnFormula></saw:column></saw:columns>
         <saw:filter>
            <sawx:expr xsi:type="sawx:logical" op="and">
               <sawx:expr op="equal" xsi:type="sawx:comparison">
                  <sawx:expr xsi:type="sawx:sqlExpression">"Fecha"."Fecha"</sawx:expr>
                  <sawx:expr xsi:type="sawx:variable" op="server">Var_Fecha_Ult_Cargue_Tasas_Cambio_T</sawx:expr></sawx:expr>
               <sawx:expr xsi:type="sawx:logical" op="or">
                  <sawx:expr op="notIn" xsi:type="sawx:list">
                     <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#0000FF; font-size:10px"&gt;&lt;sup&gt; 1 &lt;/sup&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#0000FF; font-size:8px"&gt;&lt;sup&gt;  TRM  &lt;/sup&gt; &lt;/span&gt;' ELSE Moneda."Id Moneda" END</sawx:expr>
                     
                     
                     
                     
                     <sawx:expr xsi:type="xsd:string">COP</sawx:expr><sawx:expr xsi:type="xsd:string">VE1</sawx:expr><sawx:expr xsi:type="xsd:string">VEF</sawx:expr><sawx:expr xsi:type="xsd:string">PEN</sawx:expr><sawx:expr xsi:type="xsd:string">BRL</sawx:expr><sawx:expr xsi:type="xsd:string">VES</sawx:expr><sawx:expr xsi:type="xsd:string">VE2</sawx:expr></sawx:expr>
                  <sawx:expr xsi:type="sawx:logical" op="and">
                     <sawx:expr xsi:type="sawx:list" op="in">
                        <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                        
                        <sawx:expr xsi:type="xsd:string">VEF</sawx:expr><sawx:expr xsi:type="xsd:string">VE1</sawx:expr><sawx:expr xsi:type="xsd:string">VES</sawx:expr><sawx:expr xsi:type="xsd:string">VE2</sawx:expr><sawx:expr xsi:type="xsd:string">VED</sawx:expr></sawx:expr>
                     <sawx:expr op="equal" xsi:type="sawx:comparison">
                        <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                        <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Venezuela_T</sawx:expr></sawx:expr></sawx:expr>
                  <sawx:expr xsi:type="sawx:logical" op="and">
                     <sawx:expr xsi:type="sawx:comparison" op="equal">
                        <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                        <sawx:expr xsi:type="xsd:string">PEN</sawx:expr></sawx:expr>
                     <sawx:expr op="equal" xsi:type="sawx:comparison">
                        <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                        <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Peru_T</sawx:expr></sawx:expr></sawx:expr>
                  <sawx:expr xsi:type="sawx:logical" op="and">
                     <sawx:expr xsi:type="sawx:comparison" op="equal">
                        <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                        <sawx:expr xsi:type="xsd:string">BRL</sawx:expr></sawx:expr>
                     <sawx:expr op="equal" xsi:type="sawx:comparison">
                        <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                        <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Brasil_T</sawx:expr></sawx:expr></sawx:expr></sawx:expr><sawx:expr xsi:type="sawx:comparison" op="notEqual"><sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;'WHEN Moneda."Id Moneda" = 'USD' THEN 'USD' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'VEF' THEN 'VEF-DICOM' WHEN Moneda."Id Moneda" = 'VE1' THEN 'VEF-DIPRO' ELSE Moneda."Id Moneda" END</sawx:expr><sawx:expr xsi:type="xsd:string">BMD</sawx:expr></sawx:expr><sawx:expr xsi:type="sawx:comparison" op="equal"><sawx:expr xsi:type="sawx:sqlExpression">"Moneda"."Indicador monedas disponibles (SI/NO)"</sawx:expr><sawx:expr xsi:type="xsd:string">SI</sawx:expr></sawx:expr></sawx:expr></saw:filter>
         <saw:columnOrder/></saw:criteria>
      <saw:views currentView="2">
         <saw:view xsi:type="saw:pivotTableView" name="pivotTableView!1" autoPreview="true" scrollingEnabled="false"><saw:edges><saw:edge axis="page" showColumnHeader="true">
                  <saw:edgeLayers><saw:edgeLayer type="column" columnID="c3" insertPageBreak="false">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle"/></saw:displayFormat></saw:memberFormat>
                        <saw:headerFormat>
                           <saw:displayFormat>
                              <saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c4" insertPageBreak="false" newDropDown="true">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:memberFormat>
                        <saw:headerFormat>
                           <saw:displayFormat>
                              <saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="section"/><saw:edge axis="row" showColumnHeader="true">
                  <saw:columnOrder>
                     <saw:columnOrderRef columnID="c2" direction="ascending"/></saw:columnOrder>
                  <saw:edgeLayers><saw:edgeLayer type="column" columnID="c9" insertPageBreak="false">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec wrapText="true" hAlign="left" vAlign="middle" fontStyle="regular" fontSize="13"/></saw:displayFormat></saw:memberFormat>
                        <saw:headerFormat>
                           <saw:caption>
                              <saw:text>ISO 4217</saw:text></saw:caption>
                           <saw:displayFormat>
                              <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c2" insertPageBreak="false">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec wrapText="true" hAlign="left" vAlign="middle" fontStyle="regular" fontSize="13"/></saw:displayFormat></saw:memberFormat>
                        <saw:headerFormat>
                           <saw:displayFormat>
                              <saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="column">
                  <saw:edgeLayers><saw:edgeLayer type="measure" insertPageBreak="false" visibility="hidden">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec visibility="hidden"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c7" insertPageBreak="false">
                        <saw:memberFormat>
                           <saw:displayFormat>
                              <saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge></saw:edges><saw:measuresList>
               <saw:measure columnID="c6">
                  
                  <saw:memberFormat>
                     <saw:caption>
                        <saw:text>Tasa</saw:text></saw:caption>
                     <saw:displayFormat>
                        <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:memberFormat><saw:dataBodyFormat>
                     <saw:displayFormat>
                        <saw:formatSpec hAlign="right" vAlign="middle" wrapText="true" fontSize="13"/></saw:displayFormat></saw:dataBodyFormat></saw:measure></saw:measuresList>
            
            
            <saw:pageEdgeState>
               
               <saw:QDR><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c3"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Dólares estadounidenses por cada moneda</saw:value></saw:members></saw:staticMemberGroup><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c4"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Compra</saw:value></saw:members></saw:staticMemberGroup></saw:QDR><saw:selectionGroups><saw:selectionGroup columnID="c3" groupID="0"/><saw:selectionGroup columnID="c4" groupID="0"/></saw:selectionGroups></saw:pageEdgeState>
            <saw:greenBarFormat greenBar="allLayers" enabled="true"><saw:formatSpec backgroundColor="#D6EAF8"/></saw:greenBarFormat><saw:displayFormat><saw:formatSpec/></saw:displayFormat></saw:view>
         <saw:view xsi:type="saw:dvtchart" name="staticchart!1">
            <saw:canvasFormat height="400" width="600" showGradient="false">
               <saw:title mode="custom"/>
               <saw:gridlines default="false">
                  <saw:vertical>
                     <saw:major visible="true"/></saw:vertical>
                  <saw:horizontal>
                     <saw:major visible="true"/>
                     <saw:minor visible="true"/></saw:horizontal></saw:gridlines></saw:canvasFormat>
            <saw:selections>
               <saw:categories>
                  <saw:category>
                     <saw:columnRef columnID="c8"/></saw:category></saw:categories>
               <saw:measures>
                  <saw:column measureType="y">
                     <saw:columnRef columnID="c6"/></saw:column></saw:measures>
               <saw:seriesGenerators>
                  <saw:measureLabels/>
                  <saw:seriesGenerator>
                     <saw:columnRef columnID="c2"/></saw:seriesGenerator></saw:seriesGenerators></saw:selections>
            <saw:legendFormat position="top"/>
            <saw:display type="bar" subtype="basic">
               <saw:style effect="2d" barStyle="cylinder"/></saw:display></saw:view>
         <saw:view xsi:type="saw:compoundView" name="compoundView!1">
            <saw:cvTable><saw:cvRow><saw:cvCell viewName="titleView!1">
                     <saw:displayFormat>
                        <saw:formatSpec borderColor="#910028" borderPosition="8" borderStyle="thick"/></saw:displayFormat></saw:cvCell></saw:cvRow><saw:cvRow><saw:cvCell viewName="htmlview!2">
                     <saw:displayFormat>
                        <saw:formatSpec hAlign="left" vAlign="middle"/></saw:displayFormat></saw:cvCell></saw:cvRow><saw:cvRow><saw:cvCell viewName="tableView!1"/></saw:cvRow><saw:cvRow><saw:cvCell viewName="htmlview!1">
                     <saw:displayFormat>
                        <saw:formatSpec hAlign="left" wrapText="true"/></saw:displayFormat></saw:cvCell></saw:cvRow></saw:cvTable></saw:view>
         <saw:view xsi:type="saw:titleView" name="titleView!1" includeName="false" startedDisplay="none"><saw:title>
               <saw:caption fmt="text">
                  <saw:text>Tasas de cambio - Monedas disponibles</saw:text></saw:caption><saw:displayFormat><saw:formatSpec fontFamily="Arial" fontColor="#004677" fontStyle="bold" fontSize="16" wrapText="true"/></saw:displayFormat></saw:title><saw:subTitle>
               <saw:caption fmt="text">
                  <saw:text>1.1. Datos diarios_periodicidad diaria</saw:text></saw:caption><saw:displayFormat><saw:formatSpec fontFamily="Arial" fontColor="#000000" fontStyle="regular" fontSize="14" wrapText="true"/></saw:displayFormat></saw:subTitle></saw:view>
         <saw:view xsi:type="saw:tableView" name="tableView!1" scrollingEnabled="false" repeat="false">
            <saw:greenBarFormat greenBar="allLayers" enabled="true"><saw:formatSpec backgroundColor="#D6EAF8"/></saw:greenBarFormat><saw:pageEdgeState><saw:QDR><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c3"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Pesos colombianos por cada moneda</saw:value></saw:members></saw:staticMemberGroup><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c4"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Compra</saw:value></saw:members></saw:staticMemberGroup></saw:QDR><saw:selectionGroups><saw:selectionGroup columnID="c3" groupID="0"/><saw:selectionGroup columnID="c4" groupID="0"/></saw:selectionGroups></saw:pageEdgeState><saw:edges><saw:edge axis="page" showColumnHeader="true"><saw:edgeLayers><saw:edgeLayer type="column" columnID="c3"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c4"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="section"><saw:edgeLayers><saw:edgeLayer type="column" columnID="c7"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="row" showColumnHeader="true">
                  <saw:columnOrder><saw:columnOrderRef columnID="c9" direction="ascending"/></saw:columnOrder><saw:edgeLayers><saw:edgeLayer type="column" columnID="c9"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c2"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c6"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="column"/></saw:edges></saw:view>
         <saw:view xsi:type="saw:htmlview" name="htmlview!1">
            <saw:staticText>
               <saw:caption fmt="html">
                  <saw:text>[[b]Fuente:[/b][i]Refinitiv[/i] y  Superintendencia Financiera de Colombia. 
   [br/]
   [b]Nota:[/b] Los días 30 de septiembre y 1 de octubre de 2021 han sido declarados días festivos bancarios en Venezuela para preparar la re-denominación de la moneda. La nueva expresión monetaria, la cual suprime seis (6) ceros a la moneda, entrará en vigencia a partir del lunes 4 de octubre y no habrá cambio en el respectivo código ISO. Fuente: Refinitiv
   [br/][br/][b] Nota de exclusión de responsabilidad:[/b] [i]Refinitiv [/i]no se hacen responsables por los errores o demoras para proveer la información o cualquier actuación relacionada con ésta, salvo que éstas sean causadas directamente por negligencia de sus empleados.&lt;/span&gt;
   [br/][br/] &lt;span style="color:#000000; font-size:8px;"&gt;[b]&lt;sup&gt; 1 &lt;/sup&gt;[/b]&lt;/span&gt; CNH : código con el que [i]Refinitiv[/i]  reporta a Banco República el Reminbi Chino Offshore. No obstante lo anterior, se aclara que CNH aún no ha sido reconocida por la Organización Internacional de Estándares  (particularmente en el ISO 4217).[br/][br/]
   
   
   @{biServer.variables['Var_pie_pagina_esp']}
   
   </saw:text></saw:caption></saw:staticText></saw:view>
         <saw:view xsi:type="saw:htmlview" name="htmlview!2">
            <saw:staticText>
               <saw:caption fmt="html">
                  <saw:text>[br/]
   Información disponible en este reporte para el último día cargado al sistema.[br/][br/]
   
   [b]Nota:[/b] A partir del 4 octubre de 2021 se publica la nueva expresión de la unidad del sistema monetario nacional de la República Bolivariana de Venezuela (Bolívar Digital), de conformidad con lo establecido en el Decreto N° 4.553, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela N° 42.185 de fecha 06 de agosto de 2021. Esta información de tasa de cambio de Venezuela es tomada del Banco Central de Venezuela y únicamente se publica la tasa expresada en bolívares por dólar americano.
   </saw:text></saw:caption></saw:staticText></saw:view>
         </saw:views>
      <saw:prompts scope="report" subjectArea="&quot;Tasas de cambio&quot;"/></saw:report>`,
    };
    const config: AxiosRequestConfig<object> = {
      method: 'post',
      url: url,
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-store',
        'Content-Encoding': 'gzip',
        'Content-Security-Policy':
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' *;default-src 'self';frame-src 'self' *;font-src 'self' *;img-src 'self' data: elocation.oracle.com:* http://elocation.oracle.com *;connect-src 'self';style-src 'self' 'unsafe-inline' data: *;frame-ancestors * *",
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `ORA_BIPS_NQID=${cookieAux.ORA_BIPS_NQID}; ORA_BIPS_LBINFO=${cookieAux.ORA_BIPS_LBINFO}; __uzma=${cookieAux.__uzma}; __uzmb=${cookieAux.__uzmb}; __uzme=${cookieAux.__uzme}; __uzmc=${cookieAux.__uzmc}; __uzmd=${cookieAux.__uzmd}`,
        Date: 'Fri, 01 Mar 2024 00:34:20 GMT',
        Expires: '0',
        Origin: 'https://totoro.banrep.gov.co',
        Referer:
          'https://totoro.banrep.gov.co/analytics/saw.dll?Go&path=%2Fshared%2fSeries%20Estad%c3%adsticas_T%2F1.%20Monedas%20disponibles%2F1.1.TCM_Datos%20diarios&Options=rdf&lang=es&NQUser=publico&NQPassword=publico123',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Uzlc: 'true',
        'X-Content-Type-Options': 'nosniff',
        'X-Obips-Ajax': '1',
        'X-Oracle-Dms-Ecid': 'f7cf6d49-275b-4132-9673-314cc77eab28-0153b108',
        'X-Oracle-Dms-Rid': '0',
        'X-Xss-Protection': '1; mode=block',
      },
      data: new URLSearchParams(payload),
    };

    await axios(config)
      .then((response: AxiosResponse) => {
        responseAux = response;
      })
      .catch(() => {
        throw new FailedFetchUrlException();
      });
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    return await cheerio.load(responseAux.data);
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

function parseCookies(cookies: string[] | undefined): Cookies {
  let final: Cookies = {};
  if (cookies && cookies.length > 0) {
    final = {
      __uzma: (cookies[0] && cookies[0].split(';')[0].trim()).replace('__uzma=', ''),
      __uzmb: (cookies[1] && cookies[1].split(';')[0].trim()).replace('__uzmb=', ''),
      __uzme: (cookies[2] && cookies[2].split(';')[0].trim()).replace('__uzme=', ''),
      __uzmc: (cookies[3] && cookies[3].split(';')[0].trim()).replace('__uzmc=', ''),
      __uzmd: (cookies[5] && cookies[5].split(';')[0].trim()).replace('__uzmd=', ''),
      ORA_BIPS_LBINFO: (cookies[5] && cookies[5].split(';')[0].trim() + '; ').replace('ORA_BIPS_LBINFO=', ''),
      ORA_BIPS_NQID: (cookies[6] && cookies[6].split(';')[0].trim() + '; ').replace('ORA_BIPS_NQID=', ''),
    };
  }
  return final;
}

interface Cookies {
  __uzma?: string;
  __uzmb?: string;
  __uzme?: string;
  __uzmc?: string;
  __uzmd?: string;
  ORA_BIPS_LBINFO?: string;
  ORA_BIPS_NQID?: string;
}

export async function getWebScrapingDolar(
  url: string,
  urlCookie: string,
  labelSelector: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchDataDolar(url, urlCookie);
  try {
    const pesoChilenoElement = $(labelSelector);
    const value = pesoChilenoElement.next().text().trim();

    const date = new Date().toISOString().slice(0, 10);
    checkValue(value);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

async function fetchDataDolar(url: string, urlCookie: string): Promise<CheerioRoot> {
  let responseAux;
  try {
    const cookieAux = await getCoockies(urlCookie);
    const payload = {
      ViewState: 'o8ipma82vtmaomms1jsuk82m5u',
      ClientStateXml:
        '<sawst:envState xmlns:sawst="com.siebel.analytics.web/state/v1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlVersion="200811100"><sawst:container cid="o:go" xsi:type="sawst:unknown"><sawst:container cid="r:report" xsi:type="sawst:report" links="bsfrd" defaultView="compoundView!1" searchId="m2fo4c3mv9inker4qnmeik7m16" folder="/shared/Series Estadísticas_T/1. Monedas disponibles" itemName="1.1.TCM_Datos diarios"/></sawst:container></sawst:envState>',
      fmapId: 'VZjAgQ',
      IgnoreBypassCacheOption: 'ignoreBypassCache',
      ViewPos: 'compoundView!1',
      Action: 'updateReport',
      ViewID: 'o:go~r:report~v:compoundView!1~v:tableView!1',
      refreshViewIDs: 'o:go~r:report~v:compoundView!1~v:tableView!1',
      layer: '0',
      _scid: '',
      icharset: 'utf-8',
      ReportXML: `<saw:report xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:saw="com.siebel.analytics.web/report/v1.1" xmlns:sawx="com.siebel.analytics.web/expression/v1.1" xmlVersion="201201160" cacheControl="bypassCache">
         <saw:criteria subjectArea="&quot;Tasas de cambio_T&quot;" xsi:type="saw:simpleCriteria" withinHierarchy="true">
            <saw:columns>
               <saw:column columnID="c7" xsi:type="saw:regularColumn">
                  <saw:tableHeading>
                     <saw:caption fmt="text">
                        <saw:text>Fecha</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnHeading>
                     <saw:caption fmt="text">
                        <saw:text>Fecha</saw:text></saw:caption></saw:columnHeading>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">CAST(EVALUATE('PRO_SK_SHARE_F.DAY_NAME_SPANISH(CAST(%1 AS DATE)) || %5 || TO_CHAR(%1, %2) || %3 || PRO_SK_SHARE_F.MONTH_NAME_SPANISH(CAST(%1 AS DATE)) || %3 || TO_CHAR(%1, %4)', Fecha."Fecha (Date)",'DD',' de ','YYYY',', ') AS CHAR(50))</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c10" xsi:type="saw:regularColumn" forceGroupBy="true">
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">Fecha."Año"</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c2" xsi:type="saw:regularColumn" forceGroupBy="true">
                  <saw:tableHeading>
                     <saw:caption fmt="text">
                        <saw:text>Moneda</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnHeading>
                     <saw:caption fmt="text">
                        <saw:text>Moneda</saw:text></saw:caption>
                     <saw:displayFormat>
                        <saw:formatSpec interaction="none"/></saw:displayFormat></saw:columnHeading>
                  <saw:displayFormat>
                     <saw:formatSpec interaction="none" wrapText="true">
                        <saw:dataFormat xsi:type="saw:text" textFormat="html"/></saw:formatSpec></saw:displayFormat>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">Moneda.Moneda</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c9" xsi:type="saw:regularColumn">
                  <saw:displayFormat>
                     <saw:formatSpec suppress="default" interaction="default" wrapText="true">
                        <saw:dataFormat xsi:type="saw:text" textFormat="html"/></saw:formatSpec></saw:displayFormat>
                  <saw:columnHeading>
                     <saw:displayFormat>
                        <saw:formatSpec interaction="default"/></saw:displayFormat>
                     <saw:caption fmt="text">
                        <saw:text>Id Moneda</saw:text></saw:caption></saw:columnHeading>
                  <saw:tableHeading>
                     <saw:caption fmt="text">
                        <saw:text>Moneda</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;'WHEN Moneda."Id Moneda" = 'USD' THEN 'USD' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'VEF' THEN 'VEF-DICOM' WHEN Moneda."Id Moneda" = 'VE1' THEN 'VEF-DIPRO'  ELSE Moneda."Id Moneda" END</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c3" xsi:type="saw:regularColumn" forceGroupBy="true">
                  <saw:tableHeading>
                     <saw:caption>
                        <saw:text>Tipo de Cambio</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnHeading>
                     <saw:caption>
                        <saw:text>Tipo de cambio</saw:text></saw:caption></saw:columnHeading>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">"Tipo de Cambio"."Tipo de Cambio"</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c4" xsi:type="saw:regularColumn" forceGroupBy="true">
                  <saw:displayFormat>
                     <saw:formatSpec suppress="default" interaction="default" hAlign="center" wrapText="true"/></saw:displayFormat>
                  <saw:columnHeading>
                     <saw:displayFormat>
                        <saw:formatSpec interaction="default"/></saw:displayFormat>
                     <saw:caption>
                        <saw:text>Tipo de tasa</saw:text></saw:caption></saw:columnHeading>
                  <saw:tableHeading>
                     <saw:caption>
                        <saw:text>Tipo de Tasa</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">CASE "Tipo de Tasa"."Tipo de Tasa" WHEN 'COMPRA' THEN 'Compra' WHEN 'MEDIA' THEN 'Media' WHEN 'VENTA' THEN 'Venta' END</sawx:expr></saw:columnFormula></saw:column>
               <saw:column columnID="c6" xsi:type="saw:regularColumn" forceGroupBy="true">
                  <saw:displayFormat>
                     
                     <saw:formatSpec wrapText="true" hAlign="right" suppress="repeat">
                        <saw:dataFormat xsi:type="saw:number" commas="true" negativeType="minus" minDigits="5" maxDigits="5"/></saw:formatSpec><saw:conditionalDisplayFormats>
                        </saw:conditionalDisplayFormats></saw:displayFormat>
                  <saw:columnHeading>
                     <saw:displayFormat>
                        <saw:formatSpec/></saw:displayFormat>
                     <saw:caption fmt="text">
                        <saw:text>Tasa de cambio</saw:text></saw:caption></saw:columnHeading>
                  <saw:tableHeading>
                     <saw:caption fmt="text">
                        <saw:text>Tasas Cambio</saw:text></saw:caption></saw:tableHeading>
                  <saw:columnFormula>
                     <sawx:expr xsi:type="sawx:sqlExpression">TRUNCATE("Tasas Cambio"."Valor", 6)</sawx:expr></saw:columnFormula></saw:column></saw:columns>
            <saw:filter>
               <sawx:expr xsi:type="sawx:logical" op="and">
                  <sawx:expr op="equal" xsi:type="sawx:comparison">
                     <sawx:expr xsi:type="sawx:sqlExpression">"Fecha"."Fecha"</sawx:expr>
                     <sawx:expr xsi:type="sawx:variable" op="server">Var_Fecha_Ult_Cargue_Tasas_Cambio_T</sawx:expr></sawx:expr>
                  <sawx:expr xsi:type="sawx:logical" op="or">
                     <sawx:expr op="notIn" xsi:type="sawx:list">
                        <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#0000FF; font-size:10px"&gt;&lt;sup&gt; 1 &lt;/sup&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#0000FF; font-size:8px"&gt;&lt;sup&gt;  TRM  &lt;/sup&gt; &lt;/span&gt;' ELSE Moneda."Id Moneda" END</sawx:expr>
                        
                        
                        
                        
                        <sawx:expr xsi:type="xsd:string">COP</sawx:expr><sawx:expr xsi:type="xsd:string">VE1</sawx:expr><sawx:expr xsi:type="xsd:string">VEF</sawx:expr><sawx:expr xsi:type="xsd:string">PEN</sawx:expr><sawx:expr xsi:type="xsd:string">BRL</sawx:expr><sawx:expr xsi:type="xsd:string">VES</sawx:expr><sawx:expr xsi:type="xsd:string">VE2</sawx:expr></sawx:expr>
                     <sawx:expr xsi:type="sawx:logical" op="and">
                        <sawx:expr xsi:type="sawx:list" op="in">
                           <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                           
                           <sawx:expr xsi:type="xsd:string">VEF</sawx:expr><sawx:expr xsi:type="xsd:string">VE1</sawx:expr><sawx:expr xsi:type="xsd:string">VES</sawx:expr><sawx:expr xsi:type="xsd:string">VE2</sawx:expr><sawx:expr xsi:type="xsd:string">VED</sawx:expr></sawx:expr>
                        <sawx:expr op="equal" xsi:type="sawx:comparison">
                           <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                           <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Venezuela_T</sawx:expr></sawx:expr></sawx:expr>
                     <sawx:expr xsi:type="sawx:logical" op="and">
                        <sawx:expr xsi:type="sawx:comparison" op="equal">
                           <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                           <sawx:expr xsi:type="xsd:string">PEN</sawx:expr></sawx:expr>
                        <sawx:expr op="equal" xsi:type="sawx:comparison">
                           <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                           <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Peru_T</sawx:expr></sawx:expr></sawx:expr>
                     <sawx:expr xsi:type="sawx:logical" op="and">
                        <sawx:expr xsi:type="sawx:comparison" op="equal">
                           <sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP'  ELSE Moneda."Id Moneda" END</sawx:expr>
                           <sawx:expr xsi:type="xsd:string">BRL</sawx:expr></sawx:expr>
                        <sawx:expr op="equal" xsi:type="sawx:comparison">
                           <sawx:expr xsi:type="sawx:sqlExpression">VALUEOF("Var_fecha_ultimo_cargue_Tasas_Cambio_T")</sawx:expr>
                           <sawx:expr xsi:type="sawx:variable" op="server">Var_fecha_ultimo_cargue_Tasa_Brasil_T</sawx:expr></sawx:expr></sawx:expr></sawx:expr><sawx:expr xsi:type="sawx:comparison" op="notEqual"><sawx:expr xsi:type="sawx:sqlExpression">CASE WHEN Moneda."Id Moneda" = 'CNH' THEN 'CNH' || '&lt;span style="color:#000000; font-size:8px"&gt; &lt;b&gt;&lt;sup&gt; 1 &lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'TRM' THEN 'COP' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;'WHEN Moneda."Id Moneda" = 'USD' THEN 'USD' || '&lt;span style="color:#000000; font-size:9px"&gt;&lt;b&gt;&lt;sup&gt;&lt;/sup&gt;&lt;b&gt; &lt;/span&gt;' WHEN Moneda."Id Moneda" = 'VEF' THEN 'VEF-DICOM' WHEN Moneda."Id Moneda" = 'VE1' THEN 'VEF-DIPRO' ELSE Moneda."Id Moneda" END</sawx:expr><sawx:expr xsi:type="xsd:string">BMD</sawx:expr></sawx:expr><sawx:expr xsi:type="sawx:comparison" op="equal"><sawx:expr xsi:type="sawx:sqlExpression">"Moneda"."Indicador monedas disponibles (SI/NO)"</sawx:expr><sawx:expr xsi:type="xsd:string">SI</sawx:expr></sawx:expr></sawx:expr></saw:filter>
            <saw:columnOrder/></saw:criteria>
         <saw:views currentView="2">
            <saw:view xsi:type="saw:pivotTableView" name="pivotTableView!1" autoPreview="true" scrollingEnabled="false"><saw:edges><saw:edge axis="page" showColumnHeader="true">
                     <saw:edgeLayers><saw:edgeLayer type="column" columnID="c3" insertPageBreak="false">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle"/></saw:displayFormat></saw:memberFormat>
                           <saw:headerFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c4" insertPageBreak="false" newDropDown="true">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:memberFormat>
                           <saw:headerFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="section"/><saw:edge axis="row" showColumnHeader="true">
                     <saw:columnOrder>
                        <saw:columnOrderRef columnID="c2" direction="ascending"/></saw:columnOrder>
                     <saw:edgeLayers><saw:edgeLayer type="column" columnID="c9" insertPageBreak="false">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec wrapText="true" hAlign="left" vAlign="middle" fontStyle="regular" fontSize="13"/></saw:displayFormat></saw:memberFormat>
                           <saw:headerFormat>
                              <saw:caption>
                                 <saw:text>ISO 4217</saw:text></saw:caption>
                              <saw:displayFormat>
                                 <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c2" insertPageBreak="false">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec wrapText="true" hAlign="left" vAlign="middle" fontStyle="regular" fontSize="13"/></saw:displayFormat></saw:memberFormat>
                           <saw:headerFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="column">
                     <saw:edgeLayers><saw:edgeLayer type="measure" insertPageBreak="false" visibility="hidden">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec visibility="hidden"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c7" insertPageBreak="false">
                           <saw:memberFormat>
                              <saw:displayFormat>
                                 <saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge></saw:edges><saw:measuresList>
                  <saw:measure columnID="c6">
                     
                     <saw:memberFormat>
                        <saw:caption>
                           <saw:text>Tasa</saw:text></saw:caption>
                        <saw:displayFormat>
                           <saw:formatSpec wrapText="true" hAlign="center" vAlign="middle" fontStyle="bold" fontSize="14"/></saw:displayFormat></saw:memberFormat><saw:dataBodyFormat>
                        <saw:displayFormat>
                           <saw:formatSpec hAlign="right" vAlign="middle" wrapText="true" fontSize="13"/></saw:displayFormat></saw:dataBodyFormat></saw:measure></saw:measuresList>
               
               
               <saw:pageEdgeState>
                  
                  <saw:QDR><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c3"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Dólares estadounidenses por cada moneda</saw:value></saw:members></saw:staticMemberGroup><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c4"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Compra</saw:value></saw:members></saw:staticMemberGroup></saw:QDR><saw:selectionGroups><saw:selectionGroup columnID="c3" groupID="0"/><saw:selectionGroup columnID="c4" groupID="0"/></saw:selectionGroups></saw:pageEdgeState>
               <saw:greenBarFormat greenBar="allLayers" enabled="true"><saw:formatSpec backgroundColor="#D6EAF8"/></saw:greenBarFormat><saw:displayFormat><saw:formatSpec/></saw:displayFormat></saw:view>
            <saw:view xsi:type="saw:dvtchart" name="staticchart!1">
               <saw:canvasFormat height="400" width="600" showGradient="false">
                  <saw:title mode="custom"/>
                  <saw:gridlines default="false">
                     <saw:vertical>
                        <saw:major visible="true"/></saw:vertical>
                     <saw:horizontal>
                        <saw:major visible="true"/>
                        <saw:minor visible="true"/></saw:horizontal></saw:gridlines></saw:canvasFormat>
               <saw:selections>
                  <saw:categories>
                     <saw:category>
                        <saw:columnRef columnID="c8"/></saw:category></saw:categories>
                  <saw:measures>
                     <saw:column measureType="y">
                        <saw:columnRef columnID="c6"/></saw:column></saw:measures>
                  <saw:seriesGenerators>
                     <saw:measureLabels/>
                     <saw:seriesGenerator>
                        <saw:columnRef columnID="c2"/></saw:seriesGenerator></saw:seriesGenerators></saw:selections>
               <saw:legendFormat position="top"/>
               <saw:display type="bar" subtype="basic">
                  <saw:style effect="2d" barStyle="cylinder"/></saw:display></saw:view>
            <saw:view xsi:type="saw:compoundView" name="compoundView!1">
               <saw:cvTable><saw:cvRow><saw:cvCell viewName="titleView!1">
                        <saw:displayFormat>
                           <saw:formatSpec borderColor="#910028" borderPosition="8" borderStyle="thick"/></saw:displayFormat></saw:cvCell></saw:cvRow><saw:cvRow><saw:cvCell viewName="htmlview!2">
                        <saw:displayFormat>
                           <saw:formatSpec hAlign="left" vAlign="middle"/></saw:displayFormat></saw:cvCell></saw:cvRow><saw:cvRow><saw:cvCell viewName="tableView!1"/></saw:cvRow><saw:cvRow><saw:cvCell viewName="htmlview!1">
                        <saw:displayFormat>
                           <saw:formatSpec hAlign="left" wrapText="true"/></saw:displayFormat></saw:cvCell></saw:cvRow></saw:cvTable></saw:view>
            <saw:view xsi:type="saw:titleView" name="titleView!1" includeName="false" startedDisplay="none"><saw:title>
                  <saw:caption fmt="text">
                     <saw:text>Tasas de cambio - Monedas disponibles</saw:text></saw:caption><saw:displayFormat><saw:formatSpec fontFamily="Arial" fontColor="#004677" fontStyle="bold" fontSize="16" wrapText="true"/></saw:displayFormat></saw:title><saw:subTitle>
                  <saw:caption fmt="text">
                     <saw:text>1.1. Datos diarios_periodicidad diaria</saw:text></saw:caption><saw:displayFormat><saw:formatSpec fontFamily="Arial" fontColor="#000000" fontStyle="regular" fontSize="14" wrapText="true"/></saw:displayFormat></saw:subTitle></saw:view>
            <saw:view xsi:type="saw:tableView" name="tableView!1" scrollingEnabled="false" repeat="false">
               <saw:greenBarFormat greenBar="allLayers" enabled="true"><saw:formatSpec backgroundColor="#D6EAF8"/></saw:greenBarFormat><saw:pageEdgeState><saw:QDR><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c3"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Pesos colombianos por cada moneda</saw:value></saw:members></saw:staticMemberGroup><saw:staticMemberGroup><saw:groupType><sawx:columnRefExpr columnID="c4"/></saw:groupType><saw:members xsi:type="saw:stringMembers"><saw:value>Media</saw:value></saw:members></saw:staticMemberGroup></saw:QDR><saw:selectionGroups><saw:selectionGroup columnID="c3" groupID="0"/><saw:selectionGroup columnID="c4" groupID="0"/></saw:selectionGroups></saw:pageEdgeState><saw:edges><saw:edge axis="page" showColumnHeader="true"><saw:edgeLayers><saw:edgeLayer type="column" columnID="c3"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c4"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontColor="#000000" fontStyle="bold" hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec hAlign="center" vAlign="middle" wrapText="true" fontSize="14"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="section"><saw:edgeLayers><saw:edgeLayer type="column" columnID="c7"><saw:headerFormat><saw:displayFormat><saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat><saw:memberFormat><saw:displayFormat><saw:formatSpec fontStyle="bold" hAlign="center" vAlign="middle" fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="row" showColumnHeader="true">
                     <saw:columnOrder><saw:columnOrderRef columnID="c9" direction="ascending"/></saw:columnOrder><saw:edgeLayers><saw:edgeLayer type="column" columnID="c9"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c2"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer><saw:edgeLayer type="column" columnID="c6"><saw:memberFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:memberFormat><saw:headerFormat><saw:displayFormat><saw:formatSpec fontSize="14" wrapText="true"/></saw:displayFormat></saw:headerFormat></saw:edgeLayer></saw:edgeLayers></saw:edge><saw:edge axis="column"/></saw:edges></saw:view>
            <saw:view xsi:type="saw:htmlview" name="htmlview!1">
               <saw:staticText>
                  <saw:caption fmt="html">
                     <saw:text>[[b]Fuente:[/b][i]Refinitiv[/i] y  Superintendencia Financiera de Colombia. 
      [br/]
      [b]Nota:[/b] Los días 30 de septiembre y 1 de octubre de 2021 han sido declarados días festivos bancarios en Venezuela para preparar la re-denominación de la moneda. La nueva expresión monetaria, la cual suprime seis (6) ceros a la moneda, entrará en vigencia a partir del lunes 4 de octubre y no habrá cambio en el respectivo código ISO. Fuente: Refinitiv
      [br/][br/][b] Nota de exclusión de responsabilidad:[/b] [i]Refinitiv [/i]no se hacen responsables por los errores o demoras para proveer la información o cualquier actuación relacionada con ésta, salvo que éstas sean causadas directamente por negligencia de sus empleados.&lt;/span&gt;
      [br/][br/] &lt;span style="color:#000000; font-size:8px;"&gt;[b]&lt;sup&gt; 1 &lt;/sup&gt;[/b]&lt;/span&gt; CNH : código con el que [i]Refinitiv[/i]  reporta a Banco República el Reminbi Chino Offshore. No obstante lo anterior, se aclara que CNH aún no ha sido reconocida por la Organización Internacional de Estándares  (particularmente en el ISO 4217).[br/][br/]
      
      
      @{biServer.variables['Var_pie_pagina_esp']}
      
      </saw:text></saw:caption></saw:staticText></saw:view>
            <saw:view xsi:type="saw:htmlview" name="htmlview!2">
               <saw:staticText>
                  <saw:caption fmt="html">
                     <saw:text>[br/]
      Información disponible en este reporte para el último día cargado al sistema.[br/][br/]
      
      [b]Nota:[/b] A partir del 4 octubre de 2021 se publica la nueva expresión de la unidad del sistema monetario nacional de la República Bolivariana de Venezuela (Bolívar Digital), de conformidad con lo establecido en el Decreto N° 4.553, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela N° 42.185 de fecha 06 de agosto de 2021. Esta información de tasa de cambio de Venezuela es tomada del Banco Central de Venezuela y únicamente se publica la tasa expresada en bolívares por dólar americano.
      </saw:text></saw:caption></saw:staticText></saw:view>
            </saw:views>
         <saw:prompts scope="report" subjectArea="&quot;Tasas de cambio&quot;"/></saw:report>`,
    };
    const config: AxiosRequestConfig<object> = {
      method: 'post',
      url: url,
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-store',
        'Content-Encoding': 'gzip',
        'Content-Security-Policy':
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' *;default-src 'self';frame-src 'self' *;font-src 'self' *;img-src 'self' data: elocation.oracle.com:* http://elocation.oracle.com *;connect-src 'self';style-src 'self' 'unsafe-inline' data: *;frame-ancestors * *",
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `ORA_BIPS_NQID=${cookieAux.ORA_BIPS_NQID}; ORA_BIPS_LBINFO=${cookieAux.ORA_BIPS_LBINFO}; __uzma=${cookieAux.__uzma}; __uzmb=${cookieAux.__uzmb}; __uzme=${cookieAux.__uzme}; __uzmc=${cookieAux.__uzmc}; __uzmd=${cookieAux.__uzmd}`,
        Date: 'Fri, 01 Mar 2024 00:34:20 GMT',
        Expires: '0',
        Origin: 'https://totoro.banrep.gov.co',
        Referer:
          'https://totoro.banrep.gov.co/analytics/saw.dll?Go&path=%2Fshared%2fSeries%20Estad%c3%adsticas_T%2F1.%20Monedas%20disponibles%2F1.1.TCM_Datos%20diarios&Options=rdf&lang=es&NQUser=publico&NQPassword=publico123',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Uzlc: 'true',
        'X-Content-Type-Options': 'nosniff',
        'X-Obips-Ajax': '1',
        'X-Oracle-Dms-Ecid': 'f7cf6d49-275b-4132-9673-314cc77eab28-0153b108',
        'X-Oracle-Dms-Rid': '0',
        'X-Xss-Protection': '1; mode=block',
      },
      data: new URLSearchParams(payload),
    };

    await axios(config)
      .then((response: AxiosResponse) => {
        responseAux = response;
      })
      .catch(() => {
        throw new FailedFetchUrlException();
      });
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    return await cheerio.load(responseAux.data);
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
