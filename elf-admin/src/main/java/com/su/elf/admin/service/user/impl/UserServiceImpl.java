package com.su.elf.admin.service.user.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.su.elf.admin.entity.ClientUserAgent;
import com.su.elf.admin.service.log.LogService;
import com.su.elf.admin.service.rest.RestService;
import com.su.elf.admin.service.user.UserService;
import com.su.elf.auth.client.entity.User;
import com.su.elf.common.entity.SearchParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Desc
 * @author surongyao
 * @date 2018/5/25 下午5:37
 * @version
 */
@Service
public class UserServiceImpl implements UserService {

    private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private RestService restService;

    @Autowired
    private LogService logService;

    @Override
    //@Cacheable(value="getUser")
    public User getByName(String account) {
        SearchParam params = new SearchParam();
        params.setName(account);
        JSONObject json = getList(params);
        if(json!=null){
            JSONArray array = json.getJSONArray("list");
            if(array!=null && array.size()>0){
                User user= new User();
                json = array.getJSONObject(0);
//                user.setId(json.getInteger("id"));
//                user.setAccount(json.getString("account"));
//                user.setRoleId(json.getInteger("roleId"));
//                user.setIsSuper(json.getInteger("isSuper"));
//                user.setReadOnly(json.getInteger("readonly"));
//                user.setPassWord(json.getString("password"));
                return user;
            }
        }

        return null;
    }


    @Override
    public void addLoginLog(HttpServletRequest request, String username, String message) {
        ClientUserAgent agentGetter = new ClientUserAgent(request);
        // 添加到登录日志
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("level", "info");
        jsonObj.put("module", "admin");
        jsonObj.put("clientIp", agentGetter.getIpAddr());
        jsonObj.put("content", username + "登陆系统，" + message);
        jsonObj.put("browser", agentGetter.getBrowser());
        jsonObj.put("os", agentGetter.getOS());

        JSONObject result = logService.insertPojo(jsonObj);
        logger.info(result.toJSONString());

    }

    @Override
    public JSONObject getList(SearchParam params) {
        return restService.get("http://system/user?" + params.toString());
    }

    @Override
    public JSONObject getPojo(int id) {
        return restService.get("http://system/user/" + id);
    }

    @Override
    public JSONObject insertPojo(JSONObject pojo) {
        return restService.post("http://system/user", pojo.toJSONString());
    }

    @Override
    public JSONObject updatePojo(JSONObject pojo) {
        return restService.exchange("http://system/user", HttpMethod.PUT, pojo.toJSONString());
    }

    @Override
    public JSONObject deletePojo(int id) {
        return restService.exchange("http://system/user/" + id, HttpMethod.DELETE, id+"");
    }


}
