const firstQuestionYesButton = document.querySelector('.firstQuestionYes')

const firstQuestionNoButton = document.querySelector('.firstQuestionNo')

const secondQuestionYesButton = document.querySelector('.secondQuestionYes')

const secondQuestionNoButton = document.querySelector('.secondQuestionNo')


const thirdQuestion = document.querySelector('.thirdQuestion')

const fourthQuestion = document.querySelector('.fourthQuestion')

firstQuestionYesButton.addEventListener('click', e => {
    checkRole()
})
firstQuestionNoButton.addEventListener('click', e => {
    checkRole()
})
secondQuestionYesButton.addEventListener('click', e => {
    checkRole()
})
secondQuestionNoButton.addEventListener('click', e => {
    checkRole()
})



function checkRole() {
    if (firstQuestionYesButton.checked === true && secondQuestionYesButton.checked === true) {
        thirdQuestion.innerHTML = ` <div class="form-check ">
                    <input class="form-check-input " type="radio" name="question3" id="gridRadios1" value="yes"
                        >
                    <label class="form-check-label" for="gridRadios1">
                        Yes
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input thirdQuestionNo" type="radio" name="question3" id="gridRadios2"
                        value="no" >
                    <label class="form-check-label" for="gridRadios2">
                        No
                    </label>
                </div>`
        fourthQuestion.innerHTML = ` <div class="form-check">
                    <input class="form-check-input " type="radio" name="question4" id="gridRadios1" value="yes"
                       >
                    <label class="form-check-label " for="gridRadios1">
                        Yes
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input " type="radio" name="question4" id="gridRadios2" value="no"
                        >
                    <label class="form-check-label" for="gridRadios2">
                        No
                    </label>
                </div>`
    } else {
        thirdQuestion.innerHTML = ` <div class="form-check ">
                    <input class="form-check-input " type="radio" name="question3" id="gridRadios1" value="option1"
                        disabled>
                    <label class="form-check-label" for="gridRadios1">
                        Yes
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input thirdQuestionNo" type="radio" name="question3" id="gridRadios2"
                        value="option2" disabled >
                    <label class="form-check-label" for="gridRadios2">
                        No
                    </label>
                </div>`
        fourthQuestion.innerHTML = ` <div class="form-check">
                    <input class="form-check-input " type="radio" name="question4" id="gridRadios1" value="option1"
                       disabled>
                    <label class="form-check-label " for="gridRadios1">
                        Yes
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input " type="radio" name="question4" id="gridRadios2" value="option2"
                        disabled>
                    <label class="form-check-label" for="gridRadios2">
                        No
                    </label>
                </div>`
    }
}


