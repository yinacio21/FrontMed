module com.example.coldstartback {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.coldstartback to javafx.fxml;
    exports com.example.coldstartback;
}