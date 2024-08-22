package Egzaminas.Egzaminas.controller;

import Egzaminas.Egzaminas.model.Add;
import Egzaminas.Egzaminas.repository.AddRepository;
import Egzaminas.Egzaminas.resourceNotFoundException.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/adds")
@CrossOrigin("*")
public class AddController {
    private final AddRepository addRepository;

    @Autowired
    public AddController(AddRepository addRepository){this.addRepository=addRepository;}

    @GetMapping
    public List<Add>getAllAdds(){
        return addRepository.findAll();
    }

    @PostMapping
    public Add createAdd(@RequestBody Add add){
        return addRepository.save(add);
    }

    @PutMapping("/{id}")
    public Add updateAdd(@PathVariable Long id,@RequestBody Add updateAdd){
        Optional<Add>optionalAdd=addRepository.findById(id);
        if (optionalAdd.isPresent()){
            Add add=optionalAdd.get();
            add.setName(updateAdd.getName());
            add.setDescription(updateAdd.getDescription());
            add.setCity(updateAdd.getCity());
            add.setPrice(updateAdd.getPrice());
            add.setGategory(updateAdd.getGategory());
            return addRepository.save(add);
        }else {
            throw new ResourceNotFoundException("add not found with id "+ id);        }
    }
    @DeleteMapping("/{id}")
    public void deleteAdd(@PathVariable Long id){
        if (addRepository.existsById(id)){
            addRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("add not found with id "+ id);
        }
    }
}
