import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);
    }

    f.reset();
  }
}
