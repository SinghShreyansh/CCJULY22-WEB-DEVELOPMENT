import axios from 'axios';
import React,{useEffect,useState} from 'react';
import Users from './Users';



const GetUser = () => {

  const[users,setUsers]= useState([])

  useEffect(() => {
   axios.get('http://localhost:8787/account/getusers')
   .then(data=>{
    setUsers(data.data.msg)
   }).catch(err=>{
    console.log(err)
   })
},[]);
  return (
    <div>
      <div class="main-panel">
			<div class="container">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">User DataTable</h4>
						<ul class="breadcrumbs">
							<li class="nav-home">
								<a href="datatables.html#">
									<i class="flaticon-home"></i>
								</a>
							</li>
							<li class="separator">
								<i class="flaticon-right-arrow"></i>
							</li>
							<li class="nav-item">
								<a href="datatables.html#">Tables</a>
							</li>
							<li class="separator">
								<i class="flaticon-right-arrow"></i>
							</li>
							<li class="nav-item">
								<a href="datatables.html#">Datatables</a>
							</li>
						</ul>
					</div>
          {
            users &&
            <div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">Users</h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table id="basic-datatables" class="display table table-striped table-hover" >
											<thead>
												<tr>
													<th>Name</th>
													<th>Email</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th>Name</th>
													<th>Email</th>
												</tr>
											</tfoot>
											<tbody>
                        {
                          users &&
                          users.map((data,index)=>{
                            return <Users data={data} key={index} />
                          })
                        }

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
            </div>
          }

            </div>
            </div>
            </div>

       {/* <script>
       $(document).ready(function() {
        $('#basic-datatables').DataTable({
			  })
       })
        </script> */}
    </div>
  );
}

export default GetUser;
