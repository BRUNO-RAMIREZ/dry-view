package clases;

import java.sql.*;

public class Conexion {
    //Conexión Local

    public static Connection conectar() {
        try {
//"jdbc:mysql://localhost/dry","root",""
            String url = "jdbc:mysql://localhost/dry";
            String user = "root";
            String pass = "";

            Connection cn = DriverManager.getConnection(url, user, pass);
            return cn;
        } catch (SQLException e) {
            System.out.println("Error en conexión local " + e);
        }
        return (null);
    }
}
