import { useEffect } from 'react';


export default function Suggestions() {
    useEffect(() => {
        
        (function() {
            'use strict'
  
           
            const forms = document.querySelectorAll('.needs-validation');
  
            
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
  
                    form.classList.add('was-validated');
                }, false);
            });
        })();
    }, []);

    return (
        <>
            <h1>Öneriler</h1>
            <br />
            <div className="container">
                <form className="row g-2 needs-validation" noValidate>
                    <div className="col-md-5">
                        <label className="form-label">Ad</label>
                        <input type="text" className="form-control" id="validationServer01" required />
                        <div className="valid-feedback">
                            Geçerli!
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Soyad</label>
                        <input type="text" className="form-control" id="validationServer02" required />
                        <div className="valid-feedback">
                            Geçerli!
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Email</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend3">@</span>
                            <input type="text" className="form-control" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                            <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                Lütfen alanı doldurunuz..
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Şehir</label>
                        <input type="text" className="form-control" id="validationServer03" aria-describedby="validationServer03Feedback" required />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            Lütfen alanı doldurunuz..
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Öneriniz</label>
                        <input type="text" className="form-control" id="validationServer04" aria-describedby="validationServer04Feedback" required />
                        <div id="validationServer04Feedback" className="invalid-feedback">
                            Lütfen alanı doldurunuz..
                        </div>
                    </div>
                    
                    
    
                    <div className="col-12">
        <button type="submit"    className="btn btn-primary">Kaydet</button>
                        
                        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Kaydet</button> */}
                    </div>
                </form>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
