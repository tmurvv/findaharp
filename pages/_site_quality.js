import React from 'react';

function SiteQuality() {
		return (
				<section>
				<h1>Site Quality</h1>
				<div class="tbl-header">
						<table cellpadding="0" cellspacing="0" border="0">
						<thead>
								<tr>
								<th>Quality Item</th>
								<th>Last Checked</th>
								<th>Lighthouse Score</th>
							 	<th>Notes</th>
								</tr>
						</thead>
						</table>
				</div>
				<div class="tbl-content">
						<table cellpadding="0" cellspacing="0" border="0">
							<tbody>
								<tr>
                                    <td colspan='4'>SEO-desktop</td>
								</tr>
								<tr>
                                    <td></td>
                                    <td>June 7, 2020</td>
                                    <td>89</td>
                                    <td><textarea value=""/></td>
								</tr>
								<tr>
                                    <td></td>
                                    <td>June 7, 2020</td>
                                    <td>100</td>
                                    <td><textarea value="added meta tags"/></td>
								</tr>
								<tr>
                                    <td colspan='4'>SEO-mobile</td>
								</tr>
								<tr>
                                    <td></td>
                                    <td>June 7, 2020</td>
                                    <td>100</td>
                                    <td><textarea value=""/></td>
								</tr>
								<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><textarea value=""/></td>
								</tr>
								
						</tbody>
						</table>
				</div>
				<style jsx='true'>{`
						h1{
								font-size: 30px;
								color: #fff;
								text-transform: uppercase;
								font-weight: 300;
								text-align: center;
								margin-bottom: 15px;
							}
							table{
								width:100%;
								table-layout: fixed;
							}
							.tbl-header{
								background-color: rgba(255,255,255,0.3);
							 }
							.tbl-content{
								height:300px;
								overflow-x:auto;
								margin-top: 0px;
								border: 1px solid rgba(255,255,255,0.3);
							}
							th{
								padding: 20px 15px;
								text-align: left;
								font-weight: 700;
								font-size: 18px;
								color: #fff;
								text-transform: uppercase;
							}
							td{
								padding: 15px;
								text-align: left;
								vertical-align:middle;
								font-weight: 400;
								font-size: 16px;
								color: #fff;
								border-bottom: solid 1px rgba(255,255,255,0.1);
								overflow-x: scroll;
							}
						
							
							@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
							section{
								background-image: -webkit-linear-gradient(left, #25c481, #25b7c4);
								background-image: linear-gradient(to right, #25c481, #25b7c4);
								font-family: 'Roboto', sans-serif;
								padding: 25px;
							}
							
							
							.made-with-love {
								margin-top: 40px;
								padding: 10px;
								clear: left;
								text-align: center;
								font-size: 10px;
								font-family: arial;
								color: #fff;
							}
							.made-with-love i {
								font-style: normal;
								color: #F50057;
								font-size: 14px;
								position: relative;
								top: 2px;
							}
							.made-with-love a {
								color: #fff;
								text-decoration: none;
							}
							.made-with-love a:hover {
								text-decoration: underline;
							}
							
							::-webkit-scrollbar {
									width: 6px;
							} 
							::-webkit-scrollbar {
									width: 6px;
							} 
							::-webkit-scrollbar-track {
									-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
							} 
							::-webkit-scrollbar-thumb {
									-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
							}
							input,
							textarea {
										border-radius: 7px;
										padding: 5px 7px;
										background-color: #e2f4ec;
										border: 1px solid #106d75;
										margin-right: 15px
							}
				`}</style>
				</section>
		)
}

export default SiteQuality;
