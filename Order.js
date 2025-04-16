class Order {
  constructor(customerPhoneNumber) {
    this.orderState = {
      WELCOMING: () => {
        this.currentStep = this.orderState.CHOOSING_ITEM;
        return [
          "Welcome to MexiFiesta! 🌮",
          "What would you like to order today?",
          "1. Tacos",
          "2. Burrito",
          "3. Add Drinks to your order"
        ];
      },
      CHOOSING_ITEM: (input) => {
        const itemIndex = parseInt(input);
        if (itemIndex >= 1 && itemIndex <= 3) {
          if (itemIndex === 3) {
            this.currentStep = this.orderState.ADDING_DRINKS;
            return ["What drink would you like to add?"];
          } else {
            this.currentItem = this.menu[itemIndex - 1];
            this.currentStep = this.orderState.GETTING_SIZE;
            return [
              `You've chosen ${this.currentItem.name}.`,
              "What size would you like? (S, M, L)"
            ];
          }
        } else {
          return ["Invalid choice. Please select a valid option."];
        }
      },
      GETTING_SIZE: (input) => {
        const size = input.toUpperCase();
        if (size === "S" || size === "M" || size === "L") {
          this.currentItem.size = size;
          this.currentStep = this.orderState.CONFIRMING_ITEM;
          return [
            `You've chosen ${this.currentItem.name} in size ${size}.`,
            "Would you like to add anything else or proceed to checkout?"
          ];
        } else {
          return ["Invalid size. Please choose S, M, or L."];
        }
      },
      ADDING_DRINKS: (input) => {
        this.currentItem = this.menu[2]; // Drinks
        this.currentItem.name = input; // Allow drink name customization
        this.currentStep = this.orderState.GETTING_SIZE;
        return [
          `You've chosen ${input}.`,
          "What size would you like? (S, M, L)"
        ];
      },
      CONFIRMING_ITEM: (input) => {
        const choice = input.toLowerCase();
        if (choice === "yes" || choice === "y") {
          this.order.push(this.currentItem);
          this.currentStep = this.orderState.CHOOSING_ITEM;
          return [
            `Your ${this.currentItem.name} has been added to the order.`,
            "What else would you like to order?"
          ];
        } else if (choice === "no" || choice === "n") {
          this.currentStep = this.orderState.CHOOSING_ITEM;
          return ["Okay, what else would you like to order?"];
        } else {
          return ["Invalid choice. Please say yes or no."];
        }
      }
    };

    this.currentStep = this.orderState.WELCOMING;
    this.customerPhoneNumber = customerPhoneNumber;
    this.order = [];
    this.menu = [
      { name: "Tacos", size: "" },
      { name: "Burrito", size: "" },
      { name: "Drink", size: "" } // Placeholder for drinks
    ];
  }

  handleInput(input) {
    return this.currentStep(input);
  }

  isOrderComplete() {
    return this.order.length > 0 && this.currentStep === this.orderState.WELCOMING;
  }
}

export { Order };