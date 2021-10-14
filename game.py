import random
def guess(x):
    random_number=random.randint(1,x)
    guess=0
    while guess!=random_number:
        guess=int(input(f"Enter your number between 1 and {x}\n"))
        if guess>x:
            print("Please,enter the number within the limits")
        if guess<random_number:
            print("Sorry, try again. Too low")
        elif guess<random_number:
            print("Sorry, try again. Too high")
    print(f'Congrats, you guessed it right. The number is {random_number}')
guess(10)

