package com.su.sso.controller;

import com.su.common.entity.ResponseMessage;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author surongyao
 * @date 2019-01-10 10:55
 * @desc
 */
@RestController
public class MainController {

    private final static Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    TokenStore tokenStore;

    @RequestMapping("/oauth/logout")
    public ResponseMessage logout(HttpServletRequest request) {
        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String token = request.getParameter("access_token");
        if(StringUtils.isNotEmpty(token)){
            OAuth2AccessToken oAuth2AccessToken = tokenStore.readAccessToken(token);
            if(oAuth2AccessToken!=null){
                tokenStore.removeAccessToken(oAuth2AccessToken);
                if(logger.isInfoEnabled()){
                    logger.info("user logout, token:[{}] is invalid", token);
                }
            }
        }

        return ResponseMessage.ok();
    }

}
