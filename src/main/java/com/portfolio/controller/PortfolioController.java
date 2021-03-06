package com.portfolio.controller;

import com.portfolio.exception.ApplicationException;
import com.portfolio.model.ContactMe;
import com.portfolio.model.Portfolio;
import com.portfolio.utils.StringConstants;
import com.portfolio.utils.enume.MessageCode;
import com.portfolio.vo.ResponseVo;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

@Controller
public class PortfolioController extends GenericController {
    @RequestMapping(value = {StringConstants.PATH_PORTFOLIO_MONGO},
            method = RequestMethod.GET,
            produces = "application/json")
    @ResponseBody
    public String getFromMongo(@PathVariable String pUserId) throws ApplicationException {
        Portfolio portfolio = portfolioSvc.get(pUserId);
        return jsonUtils.toJson(portfolio);
    }

    @RequestMapping(value = {StringConstants.PATH_PORTFOLIO_FILE},
            method = RequestMethod.GET,
            produces = "application/json")
    @ResponseBody
    public String getFromFile(@PathVariable String pUserId) throws ApplicationException {
        String fn = "/portfolio.json";
        try {
            URL url = getClass().getResource(fn);
            File f = new File(url.toURI());
            if (f.exists())
                return jsonUtils.toJson(jsonUtils.toObject(f, Portfolio.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonUtils.toJson(new ResponseVo(MessageCode.NOT_FOUND, "DB not found!"));
    }

    @RequestMapping(value = {StringConstants.PATH_DOWNLOAD},
            method = RequestMethod.GET,
            produces = "application/pdf")
    public String download(@PathVariable String pUserId,
                                       HttpServletRequest request,
                                       HttpServletResponse response)
            throws URISyntaxException, IOException, ApplicationException {
        String fn = "/Dheeraj_Agrawal_CV.pdf";
        URL url = getClass().getResource(fn);
        File f = new File(url.toURI());
        System.out.println("Loading file " + fn + "(" + f.getAbsolutePath() + ")");
        if (f.exists()) {
            response.setContentType("application/pdf");
            response.setContentLength(new Long(f.length()).intValue());
            response.setHeader("Content-Disposition", "attachment; filename=Dheeraj_Agrawal_CV.pdf");
            FileCopyUtils.copy(new FileInputStream(f), response.getOutputStream());
            response.flushBuffer();
            return jsonUtils.toJson(new ResponseVo(MessageCode.SUCCESS, "Download complete!"));
        } else {
            return jsonUtils.toJson(new ResponseVo(MessageCode.NOT_FOUND, "File not found!"));
        }
    }

    @RequestMapping(value = StringConstants.PATH_CONTACT_ME,
            method = RequestMethod.POST,
            headers ="Content-Type=application/json")
    @ResponseBody
    public String contactMe(@RequestBody String pContactJson, @PathVariable String pUserId)
            throws ApplicationException {
        ContactMe contactMe = (ContactMe) jsonUtils.toObject(pContactJson, ContactMe.class);
        mailer.sendPreConfiguredMail(contactMe.getEmailMessage());
        return jsonUtils.toJson(new ResponseVo(MessageCode.SUCCESS, "Thank you!"));
    }
}