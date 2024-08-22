package Egzaminas.Egzaminas.service;

import Egzaminas.Egzaminas.model.Category;
import Egzaminas.Egzaminas.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category addCategory(Category category) {
        Optional<Category> existingCategory = categoryRepository.findByName(category.getName());
        if (existingCategory.isPresent()) {
            throw new RuntimeException("Category already exists");
        }
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> existingCategoryOpt = categoryRepository.findById(id);
        if (existingCategoryOpt.isPresent()) {
            Category existingCategory = existingCategoryOpt.get();
            existingCategory.setName(category.getName());
            return categoryRepository.save(existingCategory);
        } else {
            throw new RuntimeException("Category not found with id " + id);
        }
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
