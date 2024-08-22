package Egzaminas.Egzaminas.service;

import Egzaminas.Egzaminas.model.Add;
import Egzaminas.Egzaminas.repository.AddRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddService {

    private final AddRepository addRepository;

    public List<Add> getAllAdds(){return  addRepository.findAll();}

    public Add addAdd(Add add){return addRepository.save(add);}

    public Add updateAdd(Long id,Add add){
        Optional<Add> existingAddOpt=addRepository.findById(id);
        if (existingAddOpt.isPresent()){
            Add existingAdd=existingAddOpt.get();
            existingAdd.setName(add.getName());
            existingAdd.setGategory(add.getGategory());
            return addRepository.save(existingAdd);
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Add not found with id "+id);
        }
    }
    public void deleteAdd(Long id){addRepository.deleteById(id);}
}
