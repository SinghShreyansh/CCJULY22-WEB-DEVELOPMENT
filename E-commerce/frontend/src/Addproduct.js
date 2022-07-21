import React from 'react';
import { Link } from 'react-router-dom';

const Addproduct = () => {

  return (
    <div>
      <div class="main-panel" style={{"width":"90vw"}}>
        <div class="container">
          <div class="page-inner">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">Create Product</div>
                  </div>
                  <form id="exampleValidation" action='http://localhost:8787/account/addproduct' method='POST'>
                    <div class="card-body">
                      <div class="form-group form-show-validation row">
                        <label for="name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">Title <span class="required-label">*</span></label>
                        <div class="col-lg-4 col-md-9 col-sm-8">
                          <input type="text" class="form-control" id="addProductTitle" name="title" placeholder="Enter Title" required />
                        </div>
                      </div>
                      <div class="separator-solid"></div>
                      <div class="form-group form-show-validation row">
                        <label for="name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">Price <span class="required-label">*</span></label>
                        <div class="col-lg-4 col-md-9 col-sm-8">
                          <input type="text" class="form-control" id="addProductPrice" name="price" placeholder="Enter Price" required />
                        </div>
                      </div>
                      <div class="separator-solid"></div>
                      <div class="form-group form-show-validation row">
                        <label for="name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">Rating <span class="required-label">*</span></label>
                        <div class="col-lg-4 col-md-9 col-sm-8">
                          <input type="text" class="form-control" id="addProductRating" name="rating" placeholder="Enter Rating" required />
                        </div>
                      </div>
                      <div class="separator-solid"></div>
                      <div class="form-group form-show-validation row">
                        <label for="name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">Image Link <span class="required-label">*</span></label>
                        <div class="col-lg-4 col-md-9 col-sm-8">
                          <input type="text" class="form-control" id="addProductLink" name="image" placeholder="EnterLink" required />
                        </div>
                      </div>

                      <div class="separator-solid"></div>

                    </div>
                    <div class="card-action">
                      <div class="row">
                        <div class="col-md-12">
                          <input class="btn btn-success mr-8" type="submit" style={{"margin-right": "20px"}} value="Create Product" />
                          <Link to='/'>
                              <button class="btn btn-danger">Cancel</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
