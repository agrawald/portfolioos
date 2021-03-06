package com.portfolio.utils;

import com.portfolio.exception.ApplicationException;
import com.portfolio.utils.enume.MessageCode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

/**
 * Created by e7006722 on 27/02/14.
 */
@Service
public class JsonUtils {

    public static String SUCCESS_JSON = "{code: 'success', }";
    public static String ERROR_JSON = "{code: 'error'}";

    @Autowired
    private ObjectMapper mapper;

    public String toJson(Object obj) throws ApplicationException {
        try {
            return mapper.writeValueAsString(obj);
        } catch (IOException e) {
            throw new ApplicationException(MessageCode.OBJ2JSON_ERROR, e.getMessage(), e);
        }
    }

    public Object toObject(String json, Class<?> clazz) throws ApplicationException {
        try {
            return mapper.readValue(json, clazz);
        } catch (IOException e) {
            throw new ApplicationException(MessageCode.JSON2OBJ_ERROR, e.getMessage(), e);
        }
    }

    public Object toObject(File jsonFile, Class<?> clazz) throws ApplicationException {
        try {
            return mapper.readValue(jsonFile, clazz);
        } catch (IOException e) {
            throw new ApplicationException(MessageCode.JSON2OBJ_ERROR, e.getMessage(), e);
        }
    }
}
