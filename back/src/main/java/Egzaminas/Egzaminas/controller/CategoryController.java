package Egzaminas.Egzaminas.controller;

import Egzaminas.Egzaminas.model.Category;
import Egzaminas.Egzaminas.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorys")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }
    @GetMapping
    public List<Category> getAllCategorys(){
        return categoryService.getAllCategories();
    }
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id,@RequestBody Category category){
        return categoryService.updateCategory(id, category);
    }
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}
