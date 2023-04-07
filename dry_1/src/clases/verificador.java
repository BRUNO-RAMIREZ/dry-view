package clases;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author wili_
 */
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class verificador {
    /*public boolean esCorreoValido(String correo) {
    // Patrón regex para validar correo electrónico
    String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(correo);
    return matcher.matches();
    }*/
public boolean esNumero(String cadena) {
    // Patrón regex para validar que la cadena solo contiene números
    String regex = "[0-9]+";
    return cadena.matches(regex);
    
    }
public boolean esTexto(String cadena) {
    // Patrón regex para validar que la cadena solo contiene letras
    String regex = "[a-zA-Z]+";
    return cadena.matches(regex);
    
    }
public boolean esCaracterEspecial(String cadena) {
    // Patrón regex para validar que la cadena solo contiene caracteres especiales
    String regex = "[^a-zA-Z0-9]+";
    return cadena.matches(regex);
    }
}