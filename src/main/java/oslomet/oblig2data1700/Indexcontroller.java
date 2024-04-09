package oslomet.oblig2data1700;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class Indexcontroller {
    private final List<Billett> Billetter = new ArrayList<>();
    @PostMapping("/lagreData")
    public ResponseEntity<String> lagreBilletter(@RequestBody Billett data){
        Billetter.add(data);
        return ResponseEntity.ok("Data lagret");
    }

    @GetMapping("/getData")
    public List<Billett> getBilletter() {
        return Billetter;
    }

    @GetMapping("/clearData")
    public void slettBilletter(){
        Billetter.clear();
    }
}